import { RevenuesService } from "./revenues.service";
import express from "express";
import { Revenue } from "../models/revenue";

class Handler {
  private service = new RevenuesService();

  constructor() {
    this.multi = this.multi.bind(this);
    this.single = this.single.bind(this);
  }

  async multi(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userid = req.body.id;
      if (userid) {
        const result = await this.service.getRevenues(userid);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            revenues: result.revenues,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }

  async single(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const revenueId = req.body.id;
      if (revenueId) {
        const result = await this.service.getRevenueById(revenueId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            revenue: result.revenue,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else if (req.method === "DELETE") {
      const revenueId = req.body.id;
      if (revenueId) {
        const result = await this.service.deleteRevenueById(revenueId);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "PATCH") {
      const {
        id,
        description,
        amount,
        due_date,
        received,
        category,
        account_id,
        received_at,
      } = req.body;
      if (id) {
        const revenue: Revenue = {
          id: id,
          description: description,
          amount: amount,
          due_date: due_date,
          received: received,
          category: category,
          account_id: account_id,
          received_at: received_at,
        };
        console.log(revenue);
        const result = await this.service.updateRevenue(id, revenue);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "POST") {
      const userid = req.body.id;
      if (userid) {
        const {
          description,
          amount,
          due_date,
          received,
          category,
          account_id,
          received_at,
        } = req.body;
        const revenue: Revenue = {
          description: description,
          amount: amount,
          due_date: due_date,
          received: received,
          category: category,
          account_id: account_id,
          user_id: userid,
          received_at: received_at,
        };
        const result = await this.service.addRevenue(revenue);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

const RevenuesController = express.Router();
const Revenues = new Handler();

RevenuesController.all("/multi", Revenues.multi);
RevenuesController.all("/single", Revenues.single);

export default RevenuesController;
