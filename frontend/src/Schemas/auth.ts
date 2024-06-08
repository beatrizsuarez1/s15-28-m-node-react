import { z } from 'zod'
import { validateDate, formatDate } from '../utils/helpers';
import { toLowerCase, formatName } from '../utils/helpers';
enum UserRole {
    Freelance = 1,
    Cliente = 2
}

const caracters = /^(?=.*[!@#$%^&*(),.?":{}|<>]).*$/;
const minuscule = /(?=.*[a-z])/
const capital = /(?=.*[A-Z])/

export const loginValidation = z.object({
    email: z.string().email({
        message: "Introduzca una dirección de correo electrónico válida",
    }),
    password: z.string()
       
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
        })
        .refine(value => !/\s\s/.test(value), {
            message: "El nombre no puede contener dobles espacios"
        })
        .transform(formatName),
       last_name: z
        .string({ required_error: "Apellido es requerido" })
        .min(3, {
            message: "Debe tener mas de 3 caracteres",
        })
        .max(20, { message: "El apellido debe tener menos de 20 caracteres" })
        .regex(/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$/, {
            message: "No debe contener numeros",
        })
        .refine(value => !/\s\s/.test(value), {
            message: "El nombre no puede contener dobles espacios"
        })
        .transform(formatName),
       
    email: z.string().email({
        message: "Introduzca una dirección de correo electrónico válida",
    })
        .transform(toLowerCase),
    password: z
        .string()
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        })
        .max(20, { message: "La contraseña debe tener menos de 12 caracteres" })
        .regex(caracters, { message: "La contraseña debe tener al menos un carácter especial" })
        .regex(capital, { message: "La contraseña debe tener al menos una letra mayúscula" })
        .regex(minuscule, { message: "La contraseña debe tener al menos una letra minúscula" }),
    confirmPassword: z
        .string(),
    role_id: z.nativeEnum(UserRole, { required_error: "El rol es requerido" }),
    birthdate: z
        .date()
        .refine((date: Date) => {
            if (validateDate(date)) return date
        }, { message: ' Debes ser mayor a 18 años o menor a 99 años' })
        .transform((date: Date): String => {
            return formatDate(date);
        }),
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


// .refine((file) => {
//     if (file[0] === undefined || file[0] === null) return true; // Validación pasa si el campo es opcional
//     return ACCEPTED_IMAGE_TYPES.includes(file[0].type);
// }, "La imagen debe ser .jpg, .jpeg, .png o .webp.")