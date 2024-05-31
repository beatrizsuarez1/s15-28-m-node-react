import { Router } from 'express';
import { validateJWT } from '../middlewares/validateJWT.middleware';
import {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  disableTask,
  searchTasks,
  deleteTask
} from '../controllers/task.controller';

const router = Router();

router.post('/',validateJWT, createTask);
router.get('/',getAllTasks);
router.get('/search/:task',searchTasks);
router.get('/:id' , getTaskById);
router.patch('/:id',validateJWT, updateTask);
router.patch('/disable/:id',validateJWT, disableTask);
router.delete('/:id',validateJWT, deleteTask)

export {router};
