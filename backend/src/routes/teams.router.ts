import { Router } from 'express'
import {
  createTeam,
  deleteTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
} from '../controllers/team.controller'

const router = Router()

router.get('/', getAllTeams)
router.get('/:uuid', getTeamById)
router.post('/', createTeam)
router.put('/:uuid', updateTeam)
router.delete('/:uuid', deleteTeam)

export { router }
