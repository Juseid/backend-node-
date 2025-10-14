import { Router, Application } from "express";
import { OrderController } from "../controllers/order.controller";

export class OrderRoutes {
  public orderController: OrderController = new OrderController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/orders")
      .get(this.orderController.getAllOrders)
      .post(this.orderController.createOrder);

    app.route("/api/orders/:id")
      .get(this.orderController.getOrderById)
      .patch(this.orderController.updateOrder)
      .delete(this.orderController.deleteOrder);

    app.route("/api/orders/:id/logic")
      .delete(this.orderController.deleteOrderAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
