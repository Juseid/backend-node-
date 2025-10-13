import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface OrderDetailI {
  id_order: number;
  id_product: number;
  quantity: number;
  price: number;
}

export class OrderDetail extends Model<OrderDetailI> implements OrderDetailI {
  public id_order!: number;
  public id_product!: number;
  public quantity!: number;
  public price!: number;
}

OrderDetail.init(
  {
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    id_product: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "OrderDetail",
    tableName: "order_details",
    timestamps: false,
  }
);
