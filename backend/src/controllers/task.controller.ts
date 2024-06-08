import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Task } from '../models/tasks.model';
import { taskSchema } from '../zod/task.object';
import { validateFieldsTask, validateRequeridFieldsTask } from '../utils/validationTask';

export async function createTask(req: Request, res: Response) {
  try {
    const task = req.body;
    const validationZod = taskSchema.safeParse(task);
    console.log(validationZod);
    if (!validationZod.success) {
      const errors = validationZod.error.errors.map((err) => err.message);
      return res.status(404).json({ message: 'Error en la solicitud de los datos', errors });
    }
    const validateBodyInModel = validateFieldsTask(task)
    if (validateBodyInModel !== true)
      return res.status(400).json({ message: 'falta un dato en el cuerpo de la petición modelo', validateBodyInModel });
    const validateRequeridBody = validateRequeridFieldsTask(task)
    if (validateRequeridBody !== true) return res.status(400).json({ message: ' los campos son requeridos', validateRequeridBody });
    const newtask = await Task.create(task)
    return res.status(201).json({ message: 'tarea creada exitosamente', newtask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'la creacion de la factura tiene tiene un error interno del Servidor' });
  }
}
export async function getAllTasks(_req: Request, res: Response) {
  try {
    const getalltask = await Task.findAll()
    if (getalltask.length === 0) return res.status(404).json({ message: 'no existen tareas disponibles' });

    if (!getalltask) return res.status(404).json({ message: 'no te traes la tarea deseada' })
    res.status(200).json({
      message: 'Se traen todas las tareas correctamente',
      data: getalltask
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function getTaskById(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) return res.status(400).json({ message: "El id es requerido." });
    const getByIdtask = await Task.findByPk(id);
    if (getByIdtask == null) return res.status(404).json({ message: 'La Tarea no ah sido encontrada.' })
    if (!getByIdtask) return res.status(404).json({ message: "task not found" });
    return res.status(201).json({
      message: "La Tarea ha sido encontrada correctamente", data: getByIdtask,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input syntax for type uuid'))
        return res.status(400).json({ message: 'El UUID proporcionado es inválido. Asegúrese de que tiene el formato correcto. :D' });
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'La búsqueda de la tarea por id tiene un error interno del Servidor.' })
    }
  }
}
export async function searchTasks(req: Request, res: Response) {
  try {
    const { name } = req.query;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'El nombre es requerido y debe ser una cadena de texto' });
    }

    const searchtask = await Task.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });

    if (!searchtask.length) return res.status(404).json({ message: 'No existe registro del nombre' });

    if (searchtask == null) return res.status(404).json({ message: 'No existe registro del nombre' })
    return res.status(200).json({
      message: 'buscado correctamente',
      data: searchtask
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}
export async function updateTask(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) return res.status(401).json({ message: 'El id es requerido' })
    const task = req.body
    if(!task) return res.status(400).json({message:'hacel falta un dato'})
    
    // Validar los campos usando la función validateFieldsTask
    const validateField = validateFieldsTask(task);
    if (validateField !== true) return res.status(400).json({ message: 'Datos inválidos', errors: validateField });

    const validateBodyInModel = validateFieldsTask(task)
    if (validateBodyInModel !== true) return res.status(400).json({ message: 'falta un dato en el cuerpo de la peticion', validateBodyInModel });
    
    // Obtener la tarea por su ID
    const existingTask = await Task.findByPk(id);
    if (!existingTask) return res.status(404).json({ message: 'La tarea no ha sido encontrada' });

    // Actualizar la tarea
    await existingTask.update(task);
    
    const updateTask = await task.update(req.body)
    return res.status(201).json({ message: 'la tarea fue actualizada', updateTask })
  } catch (error) {
    if (error instanceof Error) {
      // if (error.message.includes('task.update is not a function'))
      //   return res.status(400).json({ message: 'El UUID proporcionado es inválido. Asegúrese de que tiene el formato correcto. :D' });
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'La actualización de la tarea tiene un error interno del Servidor.' })
    }
  }
}
export async function disableTask(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) res.status(401).json({ message: 'El id es requerido' })
    const task = req.body
    // const validationZod = taskSchema.safeParse(task);
    // console.log(validationZod);
    // if (!validationZod.success) {
    //   const errors = validationZod.error.errors.map((err) => err.message);
    //   return res.status(404).json({ message: 'Error en la solicitud de los datos', errors });
    // }
    const validate = validateFieldsTask(task)
    if (validate !== true) return res.status(400).json({ message: 'falta un dato en el cuerpo de la peticion', validate })

    if (!task) return res.status(404).json({ message: 'la tarea no existe', task });
    const deletedTask = await task.update({ isactive: false })
    return res.status(201).json({ message: 'la tarea fue eliminada correctamente', deletedTask });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('task.update is not a function'))
        return res.status(400).json({ message: 'El UUID proporcionado es inválido. Asegúrese de que tiene el formato correcto. :D' });
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'La actualización de la tarea a estado desactivador tiene un error interno del Servidor.' });
    }
  }
}
export async function deleteTask(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) res.status(401).json({ message: 'El id es requerido' })
    const task = req.body
    const validate = validateFieldsTask(task)
    if (validate !== true) return res.status(400).json({ message: 'falta un dato en el cuerpo de la peticion', validate })
    // const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'la tarea no existe', task });
    const deletedTask = await task.destroy(req.body)
    return res.status(201).json({ message: 'la tarea consultada fue eliminada correctamente', deletedTask })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('invalid input syntax for type uuid'))
        return res.status(400).json({ message: 'El UUID proporcionado es inválido. Asegúrese de que tiene el formato correcto. :D' });
      return res.status(500).json({ message: error.message });
    } else {
      return res.status(500).json({ message: 'En la eliminacion de la tarea existe un error interno del servidor' });
    }
  }
}

