import { Router } from 'express'
import db from '../database.js'
import z from 'zod'
const router = Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// # GET
// define the home page route
router.get('/', (req, res) => {
  const allProducts = db.prepare('SELECT * FROM products LIMIT 100').all()
  res.json(allProducts)
})

router.get('/search', (req, res) => {
  if (!req.query?.q) return
  const searchText = z.string().nonempty().trim().parse(req.query.q)
  console.debug('searchText', searchText)

  // ? https://www.sqlitetutorial.net/sqlite-full-text-search/
  db.prepare('CREATE VIRTUAL TABLE IF NOT EXISTS virtual_products USING FTS5(title, description)').run()
  const insert = db.prepare('INSERT INTO virtual_products (title, description) VALUES (?, ?)')
  const insertMany = db.transaction((products) => {
    for (const product of products) insert.run(product.title, product.description)
  })
  insertMany(db.prepare('select title, description from products').all())

  const search = db.prepare('SELECT * FROM virtual_products WHERE virtual_products MATCH ? ORDER BY title').all(searchText)
  res.json(search)
})

// Get product from ID
router.get('/:id', (req, res) => {
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
  res.json(product)
})

// Show all brands
router.get('/brands', (req, res) => {
  const allCategories = db.prepare('SELECT DISTINCT brand FROM products').all()
  res.json(allCategories)
})

// Get products of a category
router.get('/brands/:brand', (req, res) => {
  const brand = db.prepare('SELECT * FROM products WHERE brand = ?').all(req.params.brand)
  res.json(brand)
})

// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

// # POST

// Create a new product
router.post('/', (req, res) => {
  console.log(req.body)
  const newProduct = db.prepare('INSERT INTO products (title, description, price, discountPercentage, rating, stock, brand) VALUES (@title, @description, @price, @discountPrice, @rating, @stock, @brand)')
    .run(req.body)
  res.json(newProduct)
})

// # DELETE

// Delete a product by ID
router.delete('/:id', (req, res) => {
  const deleteProduct = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
  res.json(deleteProduct)
})

// # UPDATE

// Update a product by ID
// router.put('/:id', (req, res) => {
//   const updateProduct = db.prepare('UPDATE products SET title = @title, description = @description, price = @price , ')
// })

export default router
