import { DataTypes } from 'sequelize'
import { sequelize } from '../database/database'

export const CustomLabel = sequelize.define(
  'custom_labels',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    tableName: 'custom_labels',
    timestamps: false,
  }
)
