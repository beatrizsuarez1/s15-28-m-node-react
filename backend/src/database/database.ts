import { Sequelize } from 'sequelize'
import { DATABASE_URL } from '../utils/config'

export const sequelize = new Sequelize(DATABASE_URL as string)
