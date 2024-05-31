import { Team } from '../models/teams.model'
import {
  messageError,
  optionalFieldBody,
  requeriedFieldsBody,
} from '../utils/helpers'
import { Request, Response } from '../utils/types.d'
import { team } from '../zod/team.object'

export async function getAllTeams(_req: Request, res: Response) {
  try {
    const teams = await Team.findAll()
    return res.status(200).json(teams)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving teams', error })
  }
}

export async function getTeamById(req: Request, res: Response) {
  try {
    const { uuid } = req.params
    if (!uuid) return res.status(400).json({ message: 'The uuid is required' })

    const team = await Team.findByPk(uuid)
    if (!team) return res.status(404).json({ message: 'Team not found' })

    return res.status(200).json(team)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving the team', error })
  }
}

export async function createTeam(req: Request, res: Response) {
  try {
    const { body } = req
    const [error, message] = requeriedFieldsBody({
      body: req.body,
      model: Team,
      excludedFields: ['uuid'],
    })
    if (error !== 200) return res.status(error).json(message)
    team.parse(body)

    body.uuid = crypto.randomUUID()
    await Team.create(body)
    return res.status(201).json({ message: 'Team created successfully' })
  } catch (err) {
    const [error, message] = messageError(err)
    return res.status(error).json(message)
  }
}

export async function updateTeam(req: Request, res: Response) {
  try {
    const { uuid } = req.params
    const { body } = req

    const [error, message] = optionalFieldBody({
      body: body,
      model: Team,
    })
    if (error !== 200) return res.status(error).json(message)

    const partialTeam = team.partial()
    partialTeam.parse(body)

    const teamFound = await Team.findByPk(uuid)
    if (!teamFound) return res.status(404).json({ message: 'Team not found' })

    await teamFound.update(body)

    const newTeam = await Team.findByPk(uuid)
    return res.status(200).json(newTeam)
  } catch (err) {
    const [error, message] = messageError(err)
    return res.status(error).json(message)
  }
}

export async function deleteTeam(req: Request, res: Response) {
  const { uuid } = req.params
  try {
    const team = await Team.findByPk(uuid)
    if (!team) return res.status(404).json({ message: 'Team not found' })

    await team.destroy()
    return res.status(204).json({ message: 'Team deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting the team', error })
  }
}
