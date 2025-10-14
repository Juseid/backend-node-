import { Router, Application } from "express";
import { ClientController } from "../controllers/client.controller";

export class ClientRoutes {
  public clientController: ClientController = new ClientController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/clientes")
      .get(this.clientController.getAllClients)
      .post(this.clientController.createClient);

    app.route("/api/clientes/:id")
      .get(this.clientController.getClientById)
      .patch(this.clientController.updateClient)
      .delete(this.clientController.deleteClient);

    app.route("/api/clientes/:id/logic")
      .delete(this.clientController.deleteClientAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
