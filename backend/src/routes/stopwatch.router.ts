import { Router } from 'express'
import {
  createStopwatch,
  deleteStopwatch,
  editStopwatch,
  getStopwatchID,
} from '../controllers/stopwatch.controller'

const router = Router()

router.get('/:uuid', getStopwatchID)
router.post('/', createStopwatch)
router.patch('/:uuid', editStopwatch)
router.delete('/:uuid', deleteStopwatch)

export { router }
