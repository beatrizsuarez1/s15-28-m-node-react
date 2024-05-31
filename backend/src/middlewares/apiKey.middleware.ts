import { NextFunction, Request, Response } from 'express'
import { Key } from '../utils/config'

const authorizedHosts = ['localhost:3000']

export const isApiKey = (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.headers.apikey
    if (!apiKey || Key !== apiKey) {
      return res.status(404).json({ message: 'El api key no es valido.' })
    }
    const host = req.headers.host
    if (!host || !authorizedHosts.includes(host)) {
      return res
        .status(404)
        .json({ message: 'La dirección de la petición no esta autorizada.' })
    }
    next()
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'El api key tiene un error interno del Servidor.' })
  }
}
