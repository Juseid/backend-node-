import { Router, Application } from "express";
import { ProductController } from "../controllers/product.controller";

export class ProductRoutes {
  public productController: ProductController = new ProductController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/products")
      .get(this.productController.getAllProducts)
      .post(this.productController.createProduct);

    app.route("/api/products/:id")
      .get(this.productController.getProductById)
      .patch(this.productController.updateProduct)
      .delete(this.productController.deleteProduct);

    app.route("/api/products/:id/logic")
      .delete(this.productController.deleteProductAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
