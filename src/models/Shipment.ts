import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";

export interface ShipmentI {
  id?: number;
  id_order: number;
  tracking_number: string;
}

export class Shipment extends Model<ShipmentI> implements ShipmentI {
  public id!: number;
  public id_order!: number;
  public tracking_number!: string;
}

Shipment.init(
  {
    id_order: { type: DataTypes.INTEGER, allowNull: false },
    tracking_number: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Shipment",
    tableName: "shipments",
    timestamps: false,
  }
);