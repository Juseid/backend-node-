import { Router, Application } from "express";
import { PaymentController } from "../controllers/payment.controller";

export class PaymentRoutes {
  public paymentController: PaymentController = new PaymentController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
     app.route("/api/payments")
      .get(this.paymentController.getAllPayments)
      .post(this.paymentController.createPayment);

    app.route("/api/payment/:id")
      .get(this.paymentController.getPaymentById)
      .patch(this.paymentController.updatePayment)
      .delete(this.paymentController.deletePayment);

    app.route("/api/payments/:id/logic")
      .delete(this.paymentController.deletePaymentAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================


  }
}
