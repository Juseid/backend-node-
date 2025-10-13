import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface OrderI {
  id?: number;
  id_client: number;
  status: "PENDING" | "PAID" | "SHIPPED";
}

export class Order extends Model<OrderI> implements OrderI {
  public id!: number;
  public id_client!: number;
  public status!: "PENDING" | "PAID" | "SHIPPED";
}

Order.init(
  {
    id_client: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM("PENDING", "PAID", "SHIPPED"), defaultValue: "PENDING" },
  },
  {
    sequelize,
    modelName: "Order",
    tableName: "orders",
    timestamps: false,
  }
);
