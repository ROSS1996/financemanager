import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface RequestBody {
  id?: string;
  description: string;
  amount: string;
  due_date: string;
  done: string;
  origin_account_id: string;
  destination_account_id: string;
  user_id?: string;
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
      done,
      origin_account_id,
      destination_account_id,
    } = req.body as RequestBody;
    const { data } = await axios.post(
      `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/transfers/single`,
      {
        id,
        description,
        amount,
        due_date,
        done,
        origin_account_id,
        destination_account_id,
      }
    );
    return res.status(200).json({ message: "Transfer created" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
