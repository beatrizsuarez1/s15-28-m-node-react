import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { Team } from './teams.model'

const { UUID } = DataTypes

export const UserTeam = sequelize.define(
  'user_teams',
  {
    user_uuid: {
      type: UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'uuid',
      },
    },
    team_uuid: {
      type: UUID,
      allowNull: false,
      references: {
        model: Team,
        key: 'uuid',
      },
    },
  },
  {
    tableName: 'user_teams',
    timestamps: false,
  }
)
