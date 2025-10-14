import { Router, Application } from "express";
import { ProductTagController } from "../controllers/productTag.controller";

export class ProductRoutes {
  public productTagController: ProductTagController = new ProductTagController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/ProductTags")
      .get(this.productTagController.getAllProductTags)
      .post(this.productTagController.createProductTag);

    app.route("/api/ProductTags/:id")
      .get(this.productTagController.getProductTagById)
      .patch(this.productTagController.updateProductTag)
      .delete(this.productTagController.deleteProductTag);

    app.route("/api/ProductTags/:id/logic")
      .delete(this.productTagController.deleteProductTagAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
