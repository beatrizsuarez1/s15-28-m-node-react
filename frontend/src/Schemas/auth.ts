import { z } from 'zod'

export const loginValidation = z.object({
    email: z.string().email({
        message: "Introduzca una dirección de correo electrónico válida",
    }),
    password: z.string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        })
        .max(16, { message: "La contraseña debe tener menos de 16 caracteres" }),
})

export const registerValidation = z.object({

})