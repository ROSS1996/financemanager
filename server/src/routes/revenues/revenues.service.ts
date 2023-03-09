import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import db from "../../db";
import { Revenue } from "../models/revenue";
import { validationResult } from "express-validator";
import { revenueValidation } from "./revenues.validation";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";

interface RevenuesResponse {
  statusCode: number;
  message: string;
  revenues: Revenue[];
}

interface SingleRevenues {
  statusCode: number;
  message: string;
  revenue?: Revenue | null | undefined;
}

export class RevenuesService {
  async getRevenues(userid: string): Promise<RevenuesResponse> {
    try {
      const result = await db.query(
        "SELECT * FROM revenues WHERE user_id = $1",
        [userid]
      );
      const revenuesInfo = result.rows.map((row) => ({
        id: row.id,
        description: row.description,
        amount: row.amount,
        due_date: row.due_date,
        received: row.received,
        category: row.category,
        user_id: row.user_id,
        account_id: row.account_id,
        received_at: row.received_at,
        created_at: row.created_at,
        updated_at: row.updated_at,
      }));
      return {
        statusCode: 200,
        message: "Revenues retrieved successfully",
        revenues: revenuesInfo,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
        revenues: [],
      };
    }
  }

  async getRevenueById(revenueId: string): Promise<SingleRevenues> {
    const errors = validationResult(revenueValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid revenue data" };
    }
    try {
      const result = await db.query("SELECT * FROM revenues WHERE id = $1", [
        revenueId,
      ]);
      const RevenuesInfo = result.rows[0];
      if (!RevenuesInfo) {
        return {
          statusCode: 404,
          message: "revenue not found",
          revenue: null,
        };
      }
      const revenue: Revenue = {
        id: RevenuesInfo.id,
        description: RevenuesInfo.description,
        amount: RevenuesInfo.amount,
        due_date: RevenuesInfo.due_date,
        received: RevenuesInfo.received,
        category: RevenuesInfo.category,
        account_id: RevenuesInfo.account_id,
        user_id: RevenuesInfo.user_id,
        received_at: RevenuesInfo.received_at,
        created_at: RevenuesInfo.created_at,
        updated_at: RevenuesInfo.updated_at,
      };
      return {
        statusCode: 200,
        message: "revenue retrieved successfully",
        revenue: revenue,
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
        revenue: null,
      };
    }
  }

  async deleteRevenueById(
    revenueId: string
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(revenueValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid revenue data" };
    }
    try {
      const result = await db.query("DELETE FROM revenues WHERE id = $1", [
        revenueId,
      ]);
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "revenue not found",
        };
      }
      return {
        statusCode: 200,
        message: "revenue deleted successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        message: "Internal server error",
      };
    }
  }

  async addRevenue(
    revenue: Revenue
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(revenueValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid revenue data" };
    }
    try {
      await db.query(
        `INSERT INTO revenues
          (description, amount, due_date, received, category, account_id, user_id, received_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          revenue.description,
          revenue.amount,
          revenue.due_date,
          revenue.received,
          revenue.category,
          revenue.account_id,
          revenue.user_id,
          revenue.received_at,
        ]
      );
      return {
        statusCode: 200,
        message: "revenue added successfully",
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 401,
        message: "Invalid token",
      };
    }
  }

  async updateRevenue(
    revenueId: string,
    revenue: Revenue
  ): Promise<{ statusCode: number; message: string }> {
    const errors = validationResult(revenueValidation);
    if (!errors.isEmpty()) {
      return { statusCode: 401, message: "Invalid revenue data" };
    }
    try {
      const result = await db.query(
        `UPDATE revenues SET description = $1, amount = $2, due_date = $3, received = $4, category = $5, account_id = $6, received_at = $7, updated_at = NOW() WHERE id = $8`,
        [
          revenue.description,
          revenue.amount,
          revenue.due_date,
          revenue.received,
          revenue.category,
          revenue.account_id,
          revenue.received_at,
          revenueId,
        ]
      );
      if (result.rowCount === 0) {
        return {
          statusCode: 404,
          message: "revenue not found",
        };
      }
      return {
        statusCode: 200,
        message: "revenue updated successfully",
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

export default new RevenuesService();
