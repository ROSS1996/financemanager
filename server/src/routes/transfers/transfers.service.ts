import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import { Transfer } from "../models/transfer";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface TransferInfo {
  id: string;
  description: string;
  amount: number;
  due_date: string;
  done: boolean;
  origin_account_id: number;
  destination_account_id: number;
  user_id?: number;
}

interface TransfersResponse {
  statusCode: number;
  message: string;
  transfers: TransferInfo[];
}

interface SingleTransfers {
  statusCode: number;
  message: string;
  transfer?: TransferInfo | null | undefined;
}

export class TransfersService {
  async getTransfers(userId: string): Promise<TransfersResponse> {
    try {
      const result = await db.query(
        "SELECT * FROM transfers WHERE user_id = $1",
        [userId]
      );
      const transfersList = result.rows.map((row) => ({
        id: row.id,
        description: row.description,
        amount: row.amount,
        due_date: row.due_date,
        done: row.done,
        origin_account_id: row.origin_account_id,
        destination_account_id: row.destination_account_id,
        user_id: row.user_id,
      }));
      return {
        statusCode: 200,
        message: "Transfers retrieved successfully",
        transfers: transfersList,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        transfers: [],
      };
    }
  }

  async getTransferById(transferId: string): Promise<SingleTransfers> {
    try {
      const result = await db.query("SELECT * FROM transfers WHERE id = $1", [
        transferId,
      ]);
      const transferInfo = result.rows[0];
      if (!transferInfo) {
        return {
          statusCode: 404,
          message: "Transfer not found",
          transfer: null,
        };
      }
      const transfer: TransferInfo = {
        id: transferInfo.id,
        description: transferInfo.description,
        amount: transferInfo.amount,
        due_date: transferInfo.due_date,
        done: transferInfo.done,
        origin_account_id: transferInfo.origin_account_id,
        destination_account_id: transferInfo.destination_account_id,
        user_id: transferInfo.user_id,
      };
      return {
        statusCode: 200,
        message: "Transfer retrieved successfully",
        transfer: transfer,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
        transfer: null,
      };
    }
  }

  async deleteTransferById(
    transferId: string
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await db.query("DELETE FROM transfers WHERE id = $1", [
        transferId,
      ]);
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Transfer not found",
        };
      }
      return { statusCode: 200, message: "Transfer deleted successfully" };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async addTransfer(
    transfer: Transfer
  ): Promise<{ statusCode: number; message: string }> {
    try {
      await db.query(
        `INSERT INTO transfers
          (description, amount, due_date, done, origin_account_id, destination_account_id, user_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          transfer.description,
          transfer.amount,
          transfer.due_date,
          transfer.done,
          transfer.origin_account_id,
          transfer.destination_account_id,
          transfer.user_id,
        ]
      );
      return {
        statusCode: 200,
        message: "Transfer added successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async updateTransfer(
    transfer: Transfer
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await db.query(
        `UPDATE transfers SET
          description = $1,
          amount = $2,
          due_date = $3,
          done = $4,
          origin_account_id = $5,
          destination_account_id = $6
         WHERE id = $7`,
        [
          transfer.description,
          transfer.amount,
          transfer.due_date,
          transfer.done,
          transfer.origin_account_id,
          transfer.destination_account_id,
          transfer.id,
        ]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "Transfer not found",
        };
      }
      return {
        statusCode: 200,
        message: "Transfer updated successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }
}

export default new TransfersService();
