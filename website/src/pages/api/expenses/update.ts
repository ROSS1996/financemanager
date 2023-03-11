import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface RequestBody {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  paid: boolean;
  category: string;
  user_id: number;
  account_id: number;
  paid_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      id,
      description,
      amount,
      due_date,
      paid,
      category,
      account_id,
      paid_at,
    } = req.body as RequestBody;
    const { data } = await axios.patch(
      "http://localhost:3000/expenses/single",
      {
        id,
        description,
        amount,
        due_date,
        paid,
        category,
        paid_at,
        account_id,
      }
    );
    return res.status(200).json({ message: "Expense successfully updated" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
