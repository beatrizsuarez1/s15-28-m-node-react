import { Request, Response } from 'express'
import { Task } from '../models/tasks.model'
import { Op } from 'sequelize'

const taskKey = Object.keys(Task.getAttributes())
const validateFields = (body: any) => {
  const bodyKey = Object.keys(body)
  // No este vació el Cuerpo de la petición
  if (bodyKey.length === 0) {
    return { message: 'No hay campos en el body.' }
  }
  // Validar campos contra modelos
  for (const key of bodyKey) {
    if (!taskKey.includes(key)) {
      return {
        message: `El campo ${key} no está definido en el modelo usuario.`,
      }
    }
  }
  return true
}
const validateRequeridFields = (body: any) => {
  const requiredFields = taskKey.filter(
    (key) => Task.getAttributes()[key].allowNull === false
  )
  for (const field of requiredFields) {
    if (!body[field]) {
      return { message: `El campo ${field} es requerido.` }
    }
  }
  return true
}

export async function createTask(req: Request, res: Response) {
  try {
    const { body } = req
    const validateBodyInModel = validateFields(body)
    if (validateBodyInModel !== true)
      return res
        .status(400)
        .json({
          message: 'falta un dato en el cuerpo de la petición modelo',
          validateBodyInModel,
        })
    const validateRequeridBody = validateRequeridFields(body)
    if (validateRequeridBody !== true)
      return res
        .status(400)
        .json({ message: ' los campos son requeridos', validateRequeridBody })
    // if (!task) {
    //   return res.status(400).json({ message: 'existe algun error en lo datos de las tareas' })
    // }
    body.uuid = crypto.randomUUID()
    body.is_completed = false
    body.isactive = true
    body.status_uuid = 'cb01e587-9501-4370-9fd0-d2ab7b3e07d3'

    const newtask = await Task.create(body)
    return res
      .status(201)
      .json({ message: 'tarea creada exitosamente', newtask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    }
    return res
      .status(500)
      .json({
        message:
          'la creacion de la factura tiene tiene un error interno del Servidor',
      })
  }
}
export async function getAllTasks(_req: Request, res: Response) {
  try {
    const getalltask = await Task.findAll()
    if (getalltask.length === 0)
      return res.status(404).json({ message: 'no existen tareas disponibles' })

    if (!getalltask)
      return res.status(404).json({ message: 'no te traes la tarea deseada' })
    res.status(200).json({
      message: 'Se traen todas las tareas correctamente',
      data: getalltask,
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
    if (!id)
      return res.status(400).json({
        message: 'el id es requerido',
      })
    const getByIdtask = await Task.findByPk(req.params.id)
    if (getByIdtask == null)
      return res
        .status(404)
        .json({ message: 'La Tarea no ah sido encontrada.' })
    if (!getByIdtask) return res.status(404).json({ message: 'task not found' })
    return res.status(201).json({
      message: 'La Tarea ha sido encontrada correctamente',
      data: getByIdtask,
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res
        .status(500)
        .json({
          message:
            'La búsqueda de la tarea por id tiene un error interno del Servidor.',
        })
    }
  }
}
export async function searchTasks(req: Request, res: Response) {
  try {
    const { name } = req.query
    const searchtask = await Task.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    })
    if (searchtask == null)
      return res.status(404).json({ message: 'No existe registro del nombre' })
    return res.status(200).json({
      message: 'buscado correctamente',
      data: searchtask,
    })
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
    const validate = validateFields(task)
    if (validate !== true)
      return res
        .status(400)
        .json({
          message: 'falta un dato en el cuerpo de la peticion',
          validate,
        })
    const updateTask = await task.update(req.body)
    return res
      .status(201)
      .json({ message: 'la tarea fue actualizada', updateTask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res
        .status(500)
        .json({
          message:
            'La actualización de la tarea tiene un error interno del Servidor.',
        })
    }
  }
}
export async function disableTask(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) res.status(401).json({ message: 'El id es requerido' })
    const task = req.body
    const validate = validateFields(task)
    if (validate !== true)
      return res
        .status(400)
        .json({
          message: 'falta un dato en el cuerpo de la peticion',
          validate,
        })

    if (!task)
      return res.status(404).json({ message: 'la tarea no existe', task })
    const deletedTask = await task.update({ isactive: false })
    return res
      .status(201)
      .json({ message: 'la tarea fue eliminada correctamente', deletedTask })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res
        .status(500)
        .json({
          message:
            'La actualización de la tarea a estado desactivador tiene un error interno del Servidor.',
        })
    }
  }
}
export async function deleteTask(req: Request, res: Response) {
  try {
    const id = req.params.id
    if (!id) res.status(401).json({ message: 'El id es requerido' })
    const task = req.body
    const validate = validateFields(task)
    if (validate !== true)
      return res
        .status(400)
        .json({
          message: 'falta un dato en el cuerpo de la peticion',
          validate,
        })
    // const task = await Task.findByPk(req.params.id);
    if (!task)
      return res.status(404).json({ message: 'la tarea no existe', task })
    const deletedTask = await task.destroy(req.body)
    return res
      .status(201)
      .json({
        message: 'la tarea consultada fue eliminada correctamente',
        deletedTask,
      })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res
        .status(500)
        .json({
          message:
            'En la eliminacion de la tarea existe un error interno del servidor',
        })
    }
  }
}

export async function getTasksByProject(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id.length)
      return res.status(404).json({ message: 'Se requiere el id del proyecto' })
    let project_uuid = id
    const getalltask = await Task.findAll({ where: { project_uuid } });

    if (getalltask.length === 0)
      return res.status(404).json({ message: 'No existen tareas disponibles para este proyecto' })

    res.status(200).json({
      message: 'Tareas obbtenidas correctamente',
      data: getalltask,
    })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message })
    } else {
      return res.status(500).json({ message: 'Ocurrio un error desconocido' })
    }
  }
}