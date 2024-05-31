import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const Role = sequelize.define(
  'roles',
  {
    rol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    timestamps: false,
  }
)
