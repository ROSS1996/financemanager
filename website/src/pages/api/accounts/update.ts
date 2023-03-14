import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface RequestBody {
  id: string;
  name: string;
  balance: number;
  category: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, name, balance, category } = req.body as RequestBody;
    const { data } = await axios.patch(
      `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/accounts/single`,
      {
        id,
        name,
        starting_balance: balance,
        category,
      }
    );
    return res.status(200).json({ message: "Account successfully created" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
