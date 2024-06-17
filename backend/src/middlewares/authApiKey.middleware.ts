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
  if (!token)
    return res.status(403).json({ message: 'No token provided, access denied' })

  jwt.verify(token, Secret, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: 'No token provided, access denied' })
    req.userId = (user as UserPayload).id
    next()
  })
}
