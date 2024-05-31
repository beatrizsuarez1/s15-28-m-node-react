import { Router } from 'express'
import {
  createProject,
  deleteProject,
  getProjectById,
  getProjects,
  updateProject,
} from '../controllers/project.controller'
import { authenticateToken } from '../middlewares/authApiKey.middleware'

const router = Router()

router.post('/', authenticateToken, createProject)
router.get('/', getProjects)
router.get('/:id', getProjectById)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)

export { router }
