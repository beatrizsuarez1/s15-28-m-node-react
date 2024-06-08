import { z } from 'zod';

export const uuidValidation = z.string().uuid({ message: 'El campo debe ser un UUID válido' });
export const taskSchema = z.object({
  uuid: uuidValidation.optional(),
  init_date: z.date({ invalid_type_error: 'El campo init_date debe ser una fecha válida' }).optional(),
  end_date: z.date({ invalid_type_error: 'El campo end_date debe ser una fecha válida' }).optional(),
  name: z
    .string({ required_error: 'El campo name es requerido' })
    .min(2, { message: 'El mínimo de caracteres es 2' })
    .max(50, { message: 'El máximo de caracteres es 50' })
    .refine((val) => val.trimStart() === val, {
      message: 'No debe haber espacios al inicio',
    })
    .refine((val) => val.trimEnd() === val, {
      message: 'No debe haber espacios al final',
    }),
  is_completed: z.boolean({ required_error: 'El campo is_completed es requerido' }),
  is_active: z.boolean({ required_error: 'El campo is_active es requerido' }),
  status_uuid: z.string().uuid({ message: 'El campo status_uuid debe ser un UUID válido' }).optional(),
  custom_label_id: z.number({ invalid_type_error: 'El campo custom_label_id debe ser un número entero' })
    .int({ message: 'El campo custom_label_id debe ser un número entero' })
    .positive({ message: 'El campo custom_label_id debe ser un número positivo' })
    .optional(),
  label_id: z.string().uuid({ message: 'El campo label_id debe ser un UUID válido' }).optional(),
  project_uuid: z.string().uuid({ message: 'El campo project_uuid debe ser un UUID válido' }).optional(),
});

