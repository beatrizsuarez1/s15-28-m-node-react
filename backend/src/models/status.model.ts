import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { UUID, UUIDV4 } = DataTypes

export const Status = sequelize.define(
  'status',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    color: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'status',
    timestamps: false,
  }
)
