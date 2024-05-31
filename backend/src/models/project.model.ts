import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'
import { Status } from './status.model'
import { User } from './users.model'
import { CustomLabel } from './customLabels.model'

const { UUID, UUIDV4, DECIMAL } = DataTypes

export const Project = sequelize.define(
  'projects',
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
    price_hour: {
      type: DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.TEXT,
    },
    id_cliente: {
      type: DataTypes.UUID,
    },
    email_client: {
      type: DataTypes.STRING,
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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
    user_uuid: {
      type: UUID,
      references: {
        model: User,
        key: 'uuid',
      },
    },
  },
  {
    tableName: 'projects',
    timestamps: false,
  }
)
