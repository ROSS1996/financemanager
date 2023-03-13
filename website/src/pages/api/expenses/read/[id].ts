import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const id = req.query.id;
    const { data } = await axios.get(
      `http://localhost:3000/expenses/single/${id}`
    );
    return res.status(200).json({
      expense: data.expense,
    });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
