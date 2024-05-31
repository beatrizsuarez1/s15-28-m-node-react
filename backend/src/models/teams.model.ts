import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

const { UUID, UUIDV4 } = DataTypes

export const Team = sequelize.define(
  'teams',
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: 'teams',
    timestamps: false,
  }
)
