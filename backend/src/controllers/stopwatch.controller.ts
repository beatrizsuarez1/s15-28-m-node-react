import { Request, Response } from 'express'
import {
  messageError,
  optionalFieldBody,
  requeriedFieldsBody,
} from '../utils/helpers'
import { Stopwatch } from '../models/stopwatch.model'

export async function createStopwatch(req: Request, res: Response) {
  try {
    const { body } = req
    const [error, message] = requeriedFieldsBody({
      body: body,
      model: Stopwatch,
      excludedFields: ['uuid'],
    })
    if (error !== 200) return res.status(error).json(message)

    body.uuid = crypto.randomUUID()

    const newStopwatch = await Stopwatch.create(body)
    return res
      .status(201)
      .json({ message: 'Stopwatch created successfully', data: newStopwatch })
  } catch (err) {
    const [error, message] = messageError(err)
    return res.status(error).json(message)
  }
}

export async function getStopwatchID(req: Request, res: Response) {
  try {
    const { uuid } = req.params
    if (!uuid) return res.status(400).json({ message: 'Task ID is required' })
    const stopwatches = await Stopwatch.findAll({ where: { uuid } })
    return res.status(200).json(stopwatches)
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function editStopwatch(req: Request, res: Response) {
  try {
    const { uuid } = req.params
    if (!uuid)
      return res.status(400).json({ message: 'Stopwatch ID is required' })
    const { body } = req
    const [error, message] = optionalFieldBody({
      body: body,
      model: Stopwatch,
      excludedFields: ['uuid'],
    })

    if (error !== 200) return res.status(error).json(message)
    await Stopwatch.update(body, {
      where: { uuid },
    })

    const updatedStopwatch = await Stopwatch.findByPk(uuid)
    return res
      .status(200)
      .json({
        message: 'Stopwatch updated successfully',
        data: updatedStopwatch,
      })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export async function deleteStopwatch(req: Request, res: Response) {
  try {
    const { uuid } = req.params
    if (!uuid)
      return res.status(400).json({ message: 'Stopwatch uuid is required' })
    await Stopwatch.destroy({ where: { uuid } })
    return res.status(204).json({ message: 'Stopwatch deleted successfully' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
}
