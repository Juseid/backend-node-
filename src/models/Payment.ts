import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface PaymentI {
  id?: number;
  id_order: number;
  method: string;
  amount: number;
}

export class Payment extends Model<PaymentI> implements PaymentI {
  public id!: number;
  public id_order!: number;
  public method!: string;
  public amount!: number;
}

Payment.init(
  {
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);