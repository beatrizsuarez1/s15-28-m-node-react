import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import { router } from './routes'
import { isApiKey } from './middlewares/apiKey.middleware'
import { excludeRoutes } from './utils/helpers'
import cookieParser from 'cookie-parser'
const app = express()

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())
app.disable('x-powered-by')

// Routes
app.get('/', (_, res) => {
  res.send('Hello World!')
})

const routesWithoutApiKey = ['/api/v1/docs', '/api/docs', '/']
app.use(excludeRoutes(routesWithoutApiKey, isApiKey))
app.use(router)

app.use((err: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.error('Unhandled error:', err)
  res.status(500).send('Something broke!')
})

export default app
