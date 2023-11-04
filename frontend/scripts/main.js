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

async function getProducts () {
  let productsList = document.getElementById('products')
  try {
    const products = await fetch(apiURL + 'products')
    const productsJSON = await products.json()

    for (const product of productsJSON) {
      productsList = document.getElementById('products')
      productsList.innerHTML = productsList.innerHTML + `${Product(product)}`
    }
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
