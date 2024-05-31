import fs from 'fs'
import swaggerUi from 'swagger-ui-express'
import yaml from 'yaml'
import { Request, Response } from '../utils/types'
import { type Router } from 'express'

const file = fs.readFileSync('./src/docs/swagger.yaml', 'utf8')
const swaggerYaml = yaml.parse(file)

export const swaggerDocs = (app: Router, port: number) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerYaml))
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerYaml)
  })

  console.log(`📄 Docs available at http://localhost:${port}/api/docs`)
}
