import { Router, Application } from "express";
import { ShipmentController } from "../controllers/shipment.controller";

export class ShipmentRoutes {
  public shipmentController: ShipmentController = new ShipmentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/shipments")
      .get(this.shipmentController.getAllShipments)
      .post(this.shipmentController.createShipment);

    app.route("/api/shipments/:id")
      .get(this.shipmentController.getShipmentById)
      .patch(this.shipmentController.updateShipment)
      .delete(this.shipmentController.deleteSeller);

    app.route("/api/shipments/:id/logic")
      .delete(this.shipmentController.deleteSellerAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
