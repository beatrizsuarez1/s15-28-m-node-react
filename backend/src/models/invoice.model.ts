import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Project } from './project.model'

const { UUID, UUIDV4, TIME, DECIMAL } = DataTypes

export const Invoice = sequelize.define(
  'invoices',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    total_time: {
      type: TIME,
    },
    price_hour: {
      type: DECIMAL(10, 2),
    },
    project_id: {
      type: UUID,
      references: {
        model: Project,
        key: 'uuid',
      },
    },
    issue_date: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'invoices',
    timestamps: false,
  }
)
