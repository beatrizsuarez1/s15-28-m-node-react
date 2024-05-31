import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Status } from './status.model'
import { Label } from './labels.model'
import { CustomLabel } from './customLabels.model'
import { Project } from './project.model'

const { UUID, UUIDV4 } = DataTypes

export const Task = sequelize.define(
  'tasks',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    init_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    status_uuid: {
      type: UUID,
      references: {
        model: Status,
        key: 'uuid',
      },
    },
    custom_label_id: {
      type: DataTypes.INTEGER,
      references: {
        model: CustomLabel,
        key: 'id',
      },
    },
    label_id: {
      type: UUID,
      references: {
        model: Label,
        key: 'uuid',
      },
    },
    project_uuid: {
      type: UUID,
      references: {
        model: Project,
        key: 'uuid',
      },
    },
  },
  {
    tableName: 'tasks',
    timestamps: false,
  }
)
