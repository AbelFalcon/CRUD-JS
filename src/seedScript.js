import db from './database.js'

const rawData = await fetch('https://dummyjson.com/products')
const data = await rawData.json()

console.debug('products', db.prepare('SELECT * FROM products').all())

for (const product of data.products) {
  const query = db.prepare('INSERT INTO products VALUES (@id, @title, @description, @price, @discountPercentage, @rating, @stock, @brand)')
  const result = query.run({
    id: null,
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    rating: product.rating,
    stock: product.stock,
    brand: product.brand
  })
  console.debug('Query ejecutada correctamente sobre: ' + result.changes)
}
