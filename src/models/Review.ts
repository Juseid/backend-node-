import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ReviewI {
  id?: number;
  id_product: number;
  id_client: number;
  rating: number;
  comment: string;
}

export class Review extends Model<ReviewI> implements ReviewI {
  public id!: number;
  public id_product!: number;
  public id_client!: number;
  public rating!: number;
  public comment!: string;
}

Review.init(
  {
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    id_client: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    comment: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "Review",
    tableName: "reviews",
    timestamps: false,
  }
);
