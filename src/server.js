import 'dotenv/config'
import express from 'express'
import productsRoute from './routes/products.js'
import cors from 'cors'
import z from 'zod'

const app = express()

const env = z.object({
  PORT_BACKEND: z.string().min(1),
  PORT_FRONTEND: z.string().min(1)
}).parse(process.env)

const port = env.PORT_BACKEND
const portFront = env.PORT_FRONTEND

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', '*')
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.append('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/status', (req, res) => {
  res.send('Online ;)')
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
