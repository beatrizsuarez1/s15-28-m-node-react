import 'dotenv/config'

export const PORT = +(process.env.PORT ?? 3001)
export const DATABASE_URL = process.env.DATABASE_URL as string
export const Secret = process.env.JWT_SECRET as string;
export const Expire = process.env.JWT_EXPIRE as string;
export const Key = process.env.API_KEY as string;
