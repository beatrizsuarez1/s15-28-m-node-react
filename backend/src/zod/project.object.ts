import { z } from 'zod'

// Función de validación del formato de la fecha
const isDateFormatValid = (dateString: string): boolean => {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
  return dateRegex.test(dateString)
}

// Función de validación de fecha válida
const isValidDate = (dateString: string): boolean => {
  // Verifica el formato general con una expresión regular
  const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return false

  const day = parseInt(match[2], 10)
  const month = parseInt(match[1], 10)
  const year = parseInt(match[3], 10)

  // Verifica que el mes esté en el rango válido
  if (month < 1 || month > 12) return false

  // Verifica el rango de días de acuerdo al mes
  const daysInMonth = new Date(year, month, 0).getDate()
  if (day < 1 || day > daysInMonth) return false

  return true
}

// Función de validación de que no sea menor a 10 años
const isNotLessThan10Years = (dateString: string): boolean => {
  const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return false
  const [, day, month, year] = match
  const date = new Date(`${year}-${month}-${day}`)
  const currentDate = new Date()
  const tenYearsAgo = new Date()
  tenYearsAgo.setFullYear(currentDate.getFullYear() - 10)
  return !(date <= tenYearsAgo)
}

// Función de validación de que no sea hoy o en el futuro
const isNotTodayOrFuture = (dateString: string): boolean => {
  const match = dateString.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (!match) return false
  const [, day, month, year] = match
  const date = new Date(`${year}-${month}-${day}`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return !(date < today)
}

export const project = z.object({
  init_date: z
    .string()
    .refine(isDateFormatValid, {
      message: 'La fecha debe estar en el formato dd/mm/aaaa.',
    })
    .refine(isValidDate, {
      message: 'La fecha debe ser válida.',
    })
    .refine(isNotLessThan10Years, {
      message: 'La fecha debe ser menor a 10 años.',
    })
    .refine(isNotTodayOrFuture, {
      message: 'La fecha debe ser hoy o en el futuro.',
    }),
  end_date: z
    .string()
    .refine(isDateFormatValid, {
      message: 'La fecha debe estar en el formato dd/mm/aaaa.',
    })
    .refine(isValidDate, {
      message: 'La fecha debe ser válida.',
    })
    .refine(isNotLessThan10Years, {
      message: 'La fecha no debe ser menor a 10 años.',
    })
    .refine(isNotTodayOrFuture, {
      message: 'La fecha debe ser hoy o en el futuro.',
    }),
  name: z
    .string()
    .min(2, { message: 'El minimo de caracteres es 2' })
    .max(50, { message: 'El maximo de caracteres es 50' }),
  price_hour: z
    .number()
    .positive({ message: 'El valor debe ser positivo.' })
    .min(0.01, { message: 'El minimo de caracteres es 0.01' })
    .max(9999, { message: 'El maximo de caracteres es 9999' })
    .refine(
      (val) => {
        const stringValue = val.toString()
        return /^\d{1,10}(\.\d{1,2})?$/.test(stringValue)
      },
      {
        message:
          'El valor debe ser un número decimal con hasta 10 dígitos en total y hasta 2 dígitos después de la coma.',
      }
    ),
  description: z
    .string()
    .min(2, { message: 'El minimo de caracteres es 2' })
    .max(255, { message: 'El maximo de caracteres es 255' }),
  email_client: z
    .string()
    .min(6, { message: 'El minimo de caracteres es 6' })
    .max(255, { message: 'El maximo de caracteres es 255' })
    .email({
      message: 'El correo debe ser una dirección de correo electrónico.',
    })
    .refine((val) => !/\s/.test(val), { message: 'No debe haber espacios' }),
})
