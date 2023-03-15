import { TransfersService } from "./transfers.service";
import express from "express";
import { Transfer } from "../models/transfer";

class Handler {
  private service = new TransfersService();

  constructor() {
    this.multi = this.multi.bind(this);
    this.single = this.single.bind(this);
  }

  async multi(req: express.Request, res: express.Response): Promise<void> {
    if (req.method === "GET") {
      const userId = req.params.userId;
      if (!userId) res.status(401).json({ message: "Unauthorized" });
      if (userId) {
        const result = await this.service.getTransfers(userId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            transfers: result.transfers,
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
      const transferId = req.params.transferId;
      if (!transferId) res.status(401).json({ message: "Unauthorized" });
      if (transferId) {
        const result = await this.service.getTransferById(transferId);
        if (result.statusCode === 200) {
          res.status(result.statusCode).json({
            message: result.message,
            transfer: result.transfer,
          });
        } else {
          res.status(result.statusCode).json({ message: result.message });
        }
      }
    } else if (req.method === "DELETE") {
      const transferId = req.params.transferId;
      if (!transferId) res.status(401).json({ message: "Unauthorized" });

      if (transferId) {
        const result = await this.service.deleteTransferById(transferId);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "PATCH") {
      const {
        id,
        description,
        amount,
        due_date,
        done,
        origin_account_id,
        destination_account_id,
      } = req.body;
      if (id) {
        const transfer: Transfer = {
          id: id,
          description: description,
          amount: amount,
          due_date: due_date,
          done: done,
          origin_account_id: origin_account_id,
          destination_account_id: destination_account_id,
        };
        const result = await this.service.updateTransfer(transfer);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else if (req.method === "POST") {
      const userid = req.body.id;
      if (userid) {
        const {
          description,
          amount,
          due_date,
          done,
          origin_account_id,
          destination_account_id,
        } = req.body;
        const transfer: Transfer = {
          description: description,
          amount: amount,
          due_date: due_date,
          done: done,
          origin_account_id: origin_account_id,
          destination_account_id: destination_account_id,
          user_id: userid,
        };
        const result = await this.service.addTransfer(transfer);
        res.status(result.statusCode).json({ message: result.message });
      }
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}

const TransfersController = express.Router();
const Transfers = new Handler();

TransfersController.all("/multi/:userId", Transfers.multi);
TransfersController.all("/single/:transferId?", Transfers.single);

export default TransfersController;
