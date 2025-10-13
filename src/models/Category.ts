import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";


export interface CategoryI {
  id?: number;
  name: string;
}

export class Category extends Model {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: false,
  }
);
