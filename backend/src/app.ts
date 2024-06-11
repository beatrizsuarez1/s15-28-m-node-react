import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'
import { excludeRoutes } from './utils/helpers'
import cookieParser from 'cookie-parser'

const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())
app.disable('x-powered-by')

// Routes
const routesWithoutApiKey = ['/api/v1/docs', '/api/docs', '/']
app.use(excludeRoutes(routesWithoutApiKey, isApiKey))
app.use(router)

app.get('/', (_, res) => {
  res.send('Hello World!')
})

export default app
