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
function showCreateModal () {
  const modal = document.getElementById('create-modal')
  modal.showModal()

  document.getElementById('create-modal-yes').addEventListener('click', () => {
    modal.close()
  })

  document.getElementById('create-modal-no').addEventListener('click', () => {
    modal.close()
  })
}

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

async function createProduct (product) {
  try {
    const response = await fetch(apiURL + 'products', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })

    if (response.ok) {
      const newProduct = await response.json()
      console.log('Producto agregado correctamente.')
      return newProduct
    } else {
      console.error('Error al agregar el producto')
      return null
    }
  } catch (error) {
    console.error('Error inesperado al agregar el producto:', error)
    return null
  }
}

function resetFIltres () {
  const limpiarFiltrosBtn = document.getElementById('clearFiltres')

  limpiarFiltrosBtn.addEventListener('click', () => {
    const selectOptions = document.querySelectorAll('select')

    selectOptions.forEach((select) => {
      select.value = ''
    })
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
      button.addEventListener('click', (event) => {
        event.preventDefault()

        const productElement = button.parentElement.parentElement
        const productId = button.dataset.id

        showDeleteModal(productId, productElement)
      })

      // Make product listener
    })

    document.getElementById('create-modal-yes').addEventListener('click', (event) => {
      event.preventDefault()

      console.log('click')

      const product = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        price: document.getElementById('price').value,
        discountPrice: document.getElementById('discountPrice').value,
        rating: document.getElementById('rating').value,
        stock: document.getElementById('stock').value,
        brand: document.getElementById('brand').value
      }

      createProduct(product)

      console.log(product)
    })

    document.getElementById('add').addEventListener('click', (event) => {
      showCreateModal()
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
  resetFIltres()
}

main()
