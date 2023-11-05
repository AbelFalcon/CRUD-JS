import Product from './components/Product.js'

const apiURL = 'http://localhost:4001/'

async function checkStatus () {
  try {
    const respuesta = await fetch(apiURL + 'status')
    return respuesta.ok
  } catch {
    return false
  }
}

// Add producto

function modalDelete (productId, productElement) {
  const modal = document.getElementById('popup-modal')
  modal.classList.remove('hidden')

  // Si haces clic en el botón Si, entonces borras el producto y agregas hidden a la clase del popup
  document.getElementById('popup-modal-yes').addEventListener('click', function (event) {
    deleteProduct(productId, productElement)
    document.getElementById('popup-modal').classList.add('hidden')
  })

  // Si haces clic en el botón No, entonces agregas hidden a clase del popup
  document.getElementById('popup-modal-no').addEventListener('click', function (event) {
    document.getElementById('popup-modal').classList.add('hidden')
  })

  // Si haces clic en la X, entonces agregas hidden a clase del popup
  document.getElementById('popup-modal-x').addEventListener('click', function (event) {
    document.getElementById('popup-modal').classList.add('hidden')
  })
}

async function deleteProduct (id, productElement) {
  try {
    const response = await fetch(apiURL + 'products/' + id, {
      method: 'DELETE'
    })
    if (response.ok) {
      productElement.remove()
    } else {
      console.log('Error al eliminar el producto')
    }
  } catch (error) {
    return false
  }
}

async function getProducts () {
  let productsList = document.getElementById('products')
  try {
    const products = await fetch(apiURL + 'products')
    const productsJSON = await products.json()

    for (const product of productsJSON) {
      productsList = document.getElementById('products')
      productsList.innerHTML = productsList.innerHTML + `${Product(product)}`
    }

    document.querySelectorAll('#delete-product').forEach((button) => {
      button.addEventListener('click', function (event) {
        event.preventDefault()

        const productElement = this.parentElement.parentElement
        const productId = this.dataset.id

        modalDelete(productId, productElement)
      })
    })
    document.getElementById('add').addEventListener('click', function (event) {
      document.getElementById('create-modal').classList.remove('hidden')
    })
  } catch {
    productsList.innerHTML = '<span>Error</span>'
  }
}

async function main () {
  const status = await checkStatus()
  if (status === false) {
    document.getElementById('status').textContent = 'Desconectado'
    document.getElementById('status').style.color = 'orange'
    return
  }
  document.getElementById('status').textContent = 'Conectado'
  document.getElementById('status').style.color = '#16a34a'

  getProducts()
}

main()
