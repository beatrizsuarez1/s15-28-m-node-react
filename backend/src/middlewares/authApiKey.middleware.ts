import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Secret } from '../utils/config'

interface UserPayload {
  id: string
}

// Extender la interfaz Request de Express para añadir la propiedad userId
declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token as string
  if (!token) return res.sendStatus(401)

  jwt.verify(token, Secret, (err, user) => {
    if (err) return res.sendStatus(403)
    req.userId = (user as UserPayload).id
    next()
  })
}
