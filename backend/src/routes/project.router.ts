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
router.get('/', authenticateToken, getProjects)
router.get('/:id', authenticateToken, getProjectById)
router.patch('/:id', authenticateToken, updateProject)
router.delete('/:id', authenticateToken, deleteProject)

export { router }
