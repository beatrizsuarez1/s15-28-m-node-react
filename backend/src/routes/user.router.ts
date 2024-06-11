import { Router } from 'express'
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from '../controllers/user.controller'
import { validateJWT } from '../middlewares/validateJWT.middleware'

const router = Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.patch('/:id', validateJWT, updateUser)
router.delete('/:id', validateJWT, deleteUser)

export { router }
