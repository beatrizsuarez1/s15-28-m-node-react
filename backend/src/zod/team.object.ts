import { z } from 'zod'

export const team = z.object({
  name: z
    .string()
    .min(2, { message: 'El minimo de caracteres es 2' })
    .max(50, { message: 'El maximo de caracteres es 50' })
    .refine((val) => val.trimStart() === val, {
      message: 'No debe haber espacios al inicio',
    }),
  description: z
    .string()
    .min(2, { message: 'El minimo de caracteres es 2' })
    .max(50, { message: 'El maximo de caracteres es 50' }),
})
