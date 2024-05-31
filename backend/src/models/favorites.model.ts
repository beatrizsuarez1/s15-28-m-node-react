import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { Project } from './project.model'

const { UUID } = DataTypes

export const Favorite = sequelize.define(
  'favorites',
  {
    user_uuid: {
      type: UUID,
      references: {
        model: User,
        key: 'uuid',
      },
      primaryKey: true,
    },
    project_uuid: {
      type: UUID,
      references: {
        model: Project,
        key: 'uuid',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'favorites',
    timestamps: false,
  }
)
