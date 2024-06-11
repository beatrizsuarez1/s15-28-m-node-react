import { Request, Response } from 'express'
import { Project } from '../models/project.model'
import {
  convertDateToISO,
  messageError,
  optionalFieldBody,
  requeriedFieldsBody,
} from '../utils/helpers'
import { project } from '../zod/project.object'
import { format } from '@formkit/tempo'

function formateReturnProject(bodyFields: any) {
  const { dataValues: body } = bodyFields

  // Helper function to safely format a date
  function safeFormatDate(date: string, formatStyle: string, locale: string) {
    return date ? format(date, formatStyle, locale) : null
  }

  // Helper function to safely convert a date
  function safeConvertDate(date: string, fromFormat: string, toFormat: string) {
    return date ? convertDateToISO(date, fromFormat, toFormat) : null
  }

  const formatDate = {
    ...body,
    dates: {
      init_date: {
        full: safeFormatDate(body.init_date, 'full', 'es'),
        long: safeFormatDate(body.init_date, 'long', 'es'),
        short: safeFormatDate(body.init_date, 'short', 'es'),
      },
      end_date: {
        full: safeFormatDate(body.end_date, 'full', 'es'),
        long: safeFormatDate(body.end_date, 'long', 'es'),
        short: safeFormatDate(body.end_date, 'short', 'es'),
      },
    },
    init_date: safeConvertDate(body.init_date, 'YYYY-MM-DD', 'DD/MM/YYYY'),
    end_date: safeConvertDate(body.end_date, 'YYYY-MM-DD', 'DD/MM/YYYY'),
  }

  return formatDate
}

export async function createProject(req: Request, res: Response) {
  try {
    const { body } = req
    if (body.init_date) {
      const validDate = convertDateToISO(body.init_date)
      body.init_date = validDate
    }

    if (body.end_date) {
      const validDate = convertDateToISO(body.end_date)
      body.end_date = validDate
    }

    const [error, message] = requeriedFieldsBody({
      body: body,
      model: Project,
      excludedFields: [
        'uuid',
        'id_cliente',
        'init_date',
        'end_date',
        'status_uuid',
        'custom_label_id',
        'user_uuid',
        'is_completed',
        'is_active',
      ],
    })
    // Comprobar que el req.userId esta funcionando correctamente
    if (error !== 200) return res.status(error).json(message)

    const partialProject = project.partial()
    partialProject.parse(body)

    body.status_uuid = 'cb01e587-9501-4370-9fd0-d2ab7b3e07d3' // Creado en BD
    body.user_uuid = req.userId // id del usuario por token
    body.uuid = crypto.randomUUID()

    const newProject = await Project.create(body)
    const formatProject = formateReturnProject(newProject)
    return res.status(201).json(formatProject)
  } catch (err) {
    const [error, message] = messageError(err)
    return res.status(error).json(message)
  }
}

export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await Project.findAll({ where: { user_uuid: req.userId } })
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const project = await Project.findOne({
      where: { uuid: id, user_uuid: req.userId },
    })
    if (!project) {
      return res.status(404).json({ message: 'Project not found' })
    }
    return res.status(200).json(project)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { body } = req
    if (!id) return res.status(400).json({ message: 'Project ID is required' })
    const [error, message] = optionalFieldBody({
      body: body,
      model: Project,
      excludedFields: ['uuid'],
    })

    if (error !== 200) return res.status(error).json(message)

    await Project.update(body, { where: { uuid: id, user_uuid: req.userId } })

    const updatedProject = await Project.findByPk(id)
    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return res.status(200).json(updatedProject)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error })
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Project ID is required' })
    }

    const deleted = await Project.destroy({
      where: { uuid: id, user_uuid: req.userId },
    })
    if (deleted) {
      return res.status(204).json()
    }
    return res.status(404).json({ message: 'Project not found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
