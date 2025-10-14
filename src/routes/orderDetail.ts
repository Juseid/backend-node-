import { Router, Application } from "express";
import { OrderDetailController } from "../controllers/orderDetail.controller";

export class OrderDetailRoutes {
  public orderDetailController: OrderDetailController = new OrderDetailController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/orderdetails")
      .get(this.orderDetailController.getAllOrderDetails)
      .post(this.orderDetailController.createOrderDetail);

    app.route("/api/orderDetails/:id")
      .get(this.orderDetailController.getOrderDetailById)
      .patch(this.orderDetailController.updateOrderDetail)
      .delete(this.orderDetailController.deleteOrderDetail);

    app.route("/api/orderDetails/:id/logic")
      .delete(this.orderDetailController.deleteOrderDetailAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
