import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ProductTagI {
  id_product: number;
  id_tag: number;
}

export class ProductTag extends Model<ProductTagI> implements ProductTagI {
  public id_product!: number;
  public id_tag!: number;
}

ProductTag.init(
  {
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    id_tag: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "ProductTag",
    tableName: "product_tags",
    timestamps: false,
  }
);