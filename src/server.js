import 'dotenv/config'
import express from 'express'
import productsRoute from './routes/products.js'
import cors from 'cors'

const app = express()

const port = process.env.portBackEnd
const portFront = process.env.portFrontEnd

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*'])
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(cors({
  origin: `http://localhost:${portFront}`
}))

app.use(express.json())

app.use('/products', productsRoute)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})

// https://expressjs.com/en/5x/api.html#req.body
