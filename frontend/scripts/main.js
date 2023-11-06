import Product from './components/Product.js'

const apiURL = 'http://127.0.0.1:4001/'

async function checkStatus () {
  try {
    const respuesta = await fetch(apiURL + 'status')
    return respuesta.ok
  } catch {
    return false
  }
}

// Add producto

function showDeleteModal (productId, productElement) {
  /**
   * @type {HTMLDialogElement}
   */
  const modal = document.getElementById('popup-modal')
  modal.showModal()

  // Si haces clic en el botón Si, entonces borras el producto y agregas hidden a la clase del popup
  document.getElementById('popup-modal-yes').addEventListener('click', () => {
    deleteProduct(productId, productElement)
    modal.close()
  })

  // Si haces clic en el botón No, entonces agregas hidden a clase del popup
  document.getElementById('popup-modal-no').addEventListener('click', () => {
    modal.close()
  })

  // Si haces clic en la X, entonces agregas hidden a clase del popup
  // document.getElementById('popup-modal-x').addEventListener('click', toggle)
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

        showDeleteModal(productId, productElement)
      })
    })
    document.getElementById('add').addEventListener('click', function (event) {
      document.getElementById('create-modal').classList.remove('hidden')
    })
  } catch (error) {
    productsList.innerHTML = '<span>Error</span>' + error
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
