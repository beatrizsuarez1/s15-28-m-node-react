import { Router } from 'express'
import { validateJWT } from '../middlewares/validateJWT.middleware'
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  disableTask,
  searchTasks,
  deleteTask,
  getTasksByProject
} from '../controllers/task.controller'

const router = Router()

router.get('/project/:id', getTasksByProject);
router.post('/', validateJWT, createTask)
router.get('/', getAllTasks)
router.get('/search/:name', searchTasks)
router.get('/:id', getTaskById)
router.patch('/:id', validateJWT, updateTask)
router.patch('/disable/:id', validateJWT, disableTask)
router.delete('/:id', validateJWT, deleteTask)

export { router }
