import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export interface PaymentI {
  id?: number;
  id_order: number;
  method: string;
  amount: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Payment extends Model<PaymentI> implements PaymentI {
  public id!: number;
  public id_order!: number;
  public method!: string;
  public amount!: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Payment.init(
  {
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    method: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
    timestamps: false,
  }
);