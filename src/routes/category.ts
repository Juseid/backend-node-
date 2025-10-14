import { Router, Application } from "express";
import { CategoryController } from "../controllers/category.controller";

export class CategoryRoutes {
  public categoryController: CategoryController = new CategoryController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/categories")
      .get(this.categoryController.getAllCategories)
      .post(this.categoryController.createCategory);

    app.route("/api/categories/:id")
      .get(this.categoryController.getCategoryById)
      .patch(this.categoryController.updateCategory)
      .delete(this.categoryController.deleteCategory);

    app.route("/api/categories/:id/logic")
      .delete(this.categoryController.deleteCategoryAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
