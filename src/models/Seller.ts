import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Product } from "./Product";

export interface SellerI {
  id?: number;
  name: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
}

export class Seller extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public phone!: string;
  public status!: "ACTIVE" | "INACTIVE";
  public code!: string;
}

Seller.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: { msg: "Phone cannot be empty" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Email must be a valid email address" }, // Validate email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
    code: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    }
  },
    {
    sequelize,
    modelName: "seller",
    tableName: "sellers",
    timestamps: false,
  }
);

Seller.hasMany(Product, { foreignKey: "id_seller", as: "products" });
Product.belongsTo(Seller, { foreignKey: "id_seller", as: "seller" });