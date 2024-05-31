import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Secret } from "../utils/config";

export const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization!.split(" ")[1];
    const userInfo = verify(token, Secret);
    if (!userInfo) {
      return res.status(401).json({ message: "El token no es válido." });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "La validación del token ha fallado." });
  }
};
