import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { UUID, UUIDV4 } = DataTypes

export const Label = sequelize.define(
  'labels',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    description: {
      type: DataTypes.TEXT,
    },
    color: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: 'labels',
    timestamps: false,
  }
)
