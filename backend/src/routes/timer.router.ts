import { Router } from 'express'
import {
  createTimer,
  deleteTimer,
  getTimerById,
  getTimers,
  updateTimer,
} from '../controllers/timer.controller'
import { validateJWT } from '../middlewares/validateJWT.middleware'

const router = Router()

router.get('/', getTimers)
router.get('/:id', getTimerById)
router.post('/', validateJWT, createTimer)
router.put('/:id', validateJWT, updateTimer)
router.delete('/:id', validateJWT, deleteTimer)

export { router }
