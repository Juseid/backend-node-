import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface TagI {
  id?: number;
  name: string;
}

export class Tag extends Model<TagI> implements TagI {
  public id!: number;
  public name!: string;
}

Tag.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    timestamps: false,
  }
);