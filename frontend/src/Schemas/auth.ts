import { z } from 'zod'
const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
const caracters = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
import { formatDate } from '../utils/helpers';


enum UserRole {
    Freelance = 1,
    Cliente = 2
}


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
    first_name: z
        .string({ required_error: "Nombre es requerido" })
        .min(3, {
            message: "Debe tener mas de 3 caracteres",
        })
        .max(20, { message: "El nombre debe tener menos de 20 caracteres" })
        .regex(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/, {
            message: "No debe contener numeros",
        }),
    last_name: z
        .string({ required_error: "Apellido es requerido" })
        .min(3, {
            message: "Debe tener mas de 3 caracteres",
        })
        .max(20, { message: "El apellido debe tener menos de 20 caracteres" })
        .regex(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/, {
            message: "No debe contener numeros",
        }),
    email: z.string().email({
        message: "Introduzca una dirección de correo electrónico válida",
    }),
    password: z
        .string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        })
        .max(12, { message: "La contraseña debe tener menos de 12 caracteres" })
        .regex(caracters, { message: "La contraseña debe tener al menos un carácter especial" }),
    confirmPassword: z
        .string(),
    role_id: z.nativeEnum(UserRole, { required_error: "El rol es requerido" }),
    birthdate: z.preprocess(arg => {
        if (arg instanceof Date) {
            return formatDate(arg);
        }
        return arg;
    }, z.string().regex(dateRegex, { message: "La fecha debe estar en formato dd/MM/yyyy" })),
    phone: z
        .string({ required_error: "Celular es requerido" })
        .regex(/^[0-9]{10}$/, {
            message: "Ingrese un numero valido",
        }),
})
    .refine(data => data.password === data.confirmPassword, {
        message: "Las contraseñas no coinciden",
        path: ["confirmPassword"],
    });

