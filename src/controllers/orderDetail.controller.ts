import { Request, Response } from "express";
import { OrderDetail, OrderDetailI } from "../models/OrderDetail";


export class OrderDetailController {
  // Get all orderdeetails with statuss "ACTIVE"
  public async getAllOrderDetail(req: Request, res: Response) {
    try {
      const orderdetails: OrderDetailI[] = await OrderDetail.findAll({
        where: { status: 'ACTIVE' },
      });
      res.status(200).json({ orderdetails });
    } catch (error) {
      res.status(500).json({ error: "Error fetching order details" });
    }
  }

  // Get a order by ID

  public async getOrderDetailById(req: Request, res: Response) {
    try {
      const { id_order, id_product } = req.params;

      const orderDetail = await OrderDetail.findOne({
        where: { 
          id_order: id_order,
          id_product: id_product,
          status: 'ACTIVE' // El campo se llama 'status', no 'statuss'.
        },
      });
      // CORREGIDO 3: Usamos la variable correcta 'orderDetail'.
      if (orderDetail) {
        // CORREGIDO 4: Devolvemos el objeto correcto.
        res.status(200).json({ orderDetail });
      } else {
        // CORREGIDO 5: El mensaje de error es específico para OrderDetail.
        res.status(404).json({ error: "OrderDetail not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching order detail" });
    }
  }

  // Create a new OrderDetail
  public async createOrderDetail(req: Request, res: Response) {
    const { id, id_order, id_product, quantity, price, status } = req.body;
    try {
      let body: OrderDetailI = {
        id_order,
        id_product,
        quantity,
        price,
        status,
      };

      const newOrderDetail = await OrderDetail.create({ ...body });
      res.status(201).json(newOrderDetail);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a OrderDetail
  public async updateOrderDetail(req: Request, res: Response) {
    const { id_order, id_product } = req.params;
    const { quantity, price, status } = req.body;
    try {
      // CORRECTO: Buscar en el modelo OrderDetail.
      const orderDetailExist = await OrderDetail.findOne({
        where: { 
          id_order: id_order, 
          id_product: id_product,
          status: 'ACTIVE' // Asumiendo que solo actualizamos los activos.
        },
      });

      // CORRECTO: Si la instancia existe...
      if (orderDetailExist) {
        // ...la actualizamos con los nuevos datos.
        await orderDetailExist.update({ quantity, price, status });
        res.status(200).json(orderDetailExist);
      } else {
        // CORRECTO: Mensaje de error específico.
        res.status(404).json({ error: "OrderDetail not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a OrderDetail physically
public async deleteOrderDetail(req: Request, res: Response) {
  try {
    // 1. Obtienes ambos IDs de la URL
    const { id_order, id_product } = req.params;

    // 2. Usas findOne con un 'where' que incluye AMBOS campos de la clave
    const orderDetailToDelete = await OrderDetail.findOne({
      where: {
        id_order: id_order,
        id_product: id_product
      }
    });

    if (orderDetailToDelete) {
      // 3. Si lo encuentras, lo destruyes
      await orderDetailToDelete.destroy();
      res.status(200).json({ message: "OrderDetail deleted successfully" });
    } else {
      res.status(404).json({ error: "OrderDetail not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting OrderDetail" });
  }
}

  // Delete a OrderDetail logically (change status to "INACTIVE")
  public async deleteOrderDetailAdv(req: Request, res: Response) {
    try {
      const { id_order, id_product  } = req.params;
      const orderDetailToUpdate = await OrderDetail.findOne({
        where: {
          id_order: id_order,
          id_product: id_product,
          status: 'ACTIVE' },
      });

      if (orderDetailToUpdate) {
        await orderDetailToUpdate.update({ status: 'INACTIVE' });
        res.status(200).json({ message: "OrderDetail marked as inactive" });
      } else {
        res.status(404).json({ error: "OrderDetail not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking orderDetail as inactive" });
    }
  }
}