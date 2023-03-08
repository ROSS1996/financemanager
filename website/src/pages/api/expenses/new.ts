import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface RequestBody {
  id: string;
  description: string;
  amount: string;
  due_date: string;
  paid: string;
  category: string;
  account_id: string;
  paid_at: string;
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
    const { data } = await axios.post("http://localhost:3000/expenses/single", {
      id,
      description,
      amount,
      due_date,
      paid,
      category,
      account_id,
      paid_at,
    });
    return res.status(200).json({ message: "Expense created" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
