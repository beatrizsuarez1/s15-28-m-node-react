import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { User } from './users.model'
import { Team } from './teams.model'
import { Task } from './tasks.model'
import { Project } from './project.model'

const { UUID } = DataTypes

export const UserTeamProjectTask = sequelize.define(
  'user_team_project_task',
  {
    user_uuid: {
      type: UUID,
      references: {
        model: User,
        key: 'uuid',
      },
      primaryKey: true,
    },
    team_uuid: {
      type: UUID,
      references: {
        model: Team,
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
    task_uuid: {
      type: UUID,
      references: {
        model: Task,
        key: 'uuid',
      },
      primaryKey: true,
    },
  },
  {
    tableName: 'user_team_project_task',
    timestamps: false,
  }
)
