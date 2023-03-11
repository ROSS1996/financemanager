import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface RequestBody {
  id: number;
  description: string;
  amount: string;
  due_date: string;
  received: boolean;
  category: string;
  user_id: number;
  account_id: number;
  received_at?: string | null;
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
      received,
      category,
      account_id,
      received_at,
    } = req.body as RequestBody;
    const { data } = await axios.patch(
      "http://localhost:3000/revenues/single",
      {
        id,
        description,
        amount,
        due_date,
        received,
        received_at,
        category,
        account_id,
      }
    );
    return res.status(200).json({ message: "Revenue successfully updated" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
