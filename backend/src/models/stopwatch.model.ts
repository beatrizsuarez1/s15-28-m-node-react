import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Task } from './tasks.model'

const { UUID, UUIDV4, TIME } = DataTypes

export const Stopwatch = sequelize.define(
  'stopwatch',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    time: {
      type: TIME,
      allowNull: false,
    },
    task_id: {
      type: UUID,
      references: {
        model: Task,
        key: 'uuid',
      },
    },
  },
  {
    tableName: 'stopwatch',
    timestamps: false,
  }
)
