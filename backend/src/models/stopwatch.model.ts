import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Task } from "./tasks.model";

const { UUID, UUIDV4 } = DataTypes;

export const Stopwatch = sequelize.define(
  "stopwatch",
  {
    uuid: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    init_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_date: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    task_id: {
      type: UUID,
      references: {
        model: Task,
        key: "uuid",
      },
    },
  },
  {
    tableName: "stopwatch",
    timestamps: false,
  }
);
