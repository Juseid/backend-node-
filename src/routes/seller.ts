import { Router, Application } from "express";
import { SellerController } from "../controllers/seller.controller";

export class SellerRoutes {
  public sellerController: SellerController = new SellerController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/sellers")
      .get(this.sellerController.getAllSellers)
      .post(this.sellerController.createSeller);

    app.route("/api/sellers/:id")
      .get(this.sellerController.getSellerById)
      .patch(this.sellerController.updateSeller)
      .delete(this.sellerController.deleteSeller);

    app.route("/api/sellers/:id/logic")
      .delete(this.sellerController.deleteSellerAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
