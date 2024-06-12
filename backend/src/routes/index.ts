import { Router } from 'express'
import { readdirSync } from 'fs'
import { join } from 'path'

const router = Router()
const PATH_ROUTER = __dirname

const cleanFileName = (fileName: string) => {
  if (typeof fileName === 'string') {
    const file = fileName.split('.').shift()
    return file
  } else {
    return ''
  }
}

const importPromises = readdirSync(PATH_ROUTER)
  .filter(
    (fileName) => fileName !== 'index.ts' && fileName.endsWith('.router.ts')
  )
  .map((fileName) => import(join(PATH_ROUTER, fileName)))

Promise.all(importPromises)
  .then((modules) => {
    modules.forEach((module, index) => {
      const fileName = readdirSync(PATH_ROUTER).filter(
        (fileName) => fileName !== 'index.ts' && fileName.endsWith('.router.ts')
      )[index]
      if (module && module.router) {
        const cleanName = cleanFileName(fileName)
        router.use(`/api/v1/${cleanName}`, module.router)
      }
    })
  })
  .catch((error) => {
    console.error('Error al importar módulos de ruta:', error)
  })

export { router }
