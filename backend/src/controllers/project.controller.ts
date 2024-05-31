import { Request, Response } from 'express'
import { Project } from '../models/project.model'
import {
  messageError,
  optionalFieldBody,
  requeriedFieldsBody,
} from '../utils/helpers'
import { project } from '../zod/project.object'

export async function createProject(req: Request, res: Response) {
  try {
    const { body } = req

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
    return res.status(201).json(newProject)
  } catch (err) {
    const [error, message] = messageError(err)
    return res.status(error).json(message)
  }
}

export async function getProjects(_req: Request, res: Response) {
  try {
    const projects = await Project.findAll()
    return res.status(200).json(projects)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const project = await Project.findByPk(id)
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
    const [error, message] = optionalFieldBody({
      body: body,
      model: Project,
      excludedFields: ['uuid'],
    })

    if (error !== 200) return res.status(error).json(message)

    await Project.update(body, { where: { id } })

    const updatedProject = await Project.findByPk(id)

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' })
    }

    return res.status(200).json(updatedProject)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const deleted = await Project.destroy({ where: { id: req.params.id } })
    if (deleted) {
      return res.status(204).json()
    }
    return res.status(404).json({ message: 'Project not found' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
