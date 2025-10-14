import { Router, Application } from "express";
import { TagController } from "../controllers/tag.controller";

export class TagRoutes {
  public tagController: TagController = new TagController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/tags")
      .get(this.tagController.getAllTags)
      .post(this.tagController.createTag);

    app.route("/api/tags/:id")
      .get(this.tagController.getTagById)
      .patch(this.tagController.updateTag)
      .delete(this.tagController.deleteTag);

    app.route("/api/tags/:id/logic")
      .delete(this.tagController.deleteTagAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
