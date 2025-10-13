import { Request, Response } from "express";
import { Order, OrderI } from "../models/Order";

export class OrderController {
  // Get all product types
  public async getAllOrder(req: Request, res: Response) {
    try {
      const order: OrderI[] = await Order.findAll({
        where: { status: true },
      });
      res.status(200).json({ Order });
    } catch (error) {
      res.status(500).json({ error: "Error fetching order" });
    }
  }
  // Get a product type by ID
  public async getOrderById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const order = await Order.findOne({
        where: { id: pk, status: true },
      });
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json({ error: "order not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching order" });
    }
  }
  // Create a new product type
  public async createOrder(req: Request, res: Response) {
    const { id_client,  status } = req.body;
    try {
      let body: OrderI = {
        id_client,
        status,
      };

      const newOrder = await Order.create({ ...body });
      res.status(201).json(newOrder);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
  // Update a product type
  public async updateOrder(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { id_client,  status } = req.body;
    try {
      let body: OrderI = {
        id_client,
        status,
      };

      const orderExist = await Order.findOne({
        where: { id: pk, status: true },
      });

      if (orderExist) {
        await orderExist.update(body, {
          where: { id: pk },
        });
        res.status(200).json(orderExist);
      } else {
        res.status(404).json({ error: "Order not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a product type physically
  public async deleteOrder(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orderToDelete = await Order.findByPk(id);

      if (orderToDelete) {
        await orderToDelete.destroy();
        res.status(200).json({ message: "Order deleted successfully" });
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting OrdeR" });
    }
  }


}