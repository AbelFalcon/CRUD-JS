import 'dotenv/config'
import express from 'express'
import productsRoute from './routes/products.js'

const app = express()
const port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/products', productsRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// https://expressjs.com/en/5x/api.html#req.body
