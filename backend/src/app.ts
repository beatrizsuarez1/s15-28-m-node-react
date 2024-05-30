import cors from 'cors'
import express from 'express'
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.disable('x-powered-by')

// Routes

// app.use('/api', exampleRoutes)
app.get('/', (_, res) => {
  res.send('Hello World!')
})
export default app
