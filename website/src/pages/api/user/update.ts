import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { name, nickname, email, password } = req.body;
    const { data } = await axios.patch(
      "http://localhost:3000/userInfo",
      { name, nickname, email, password },
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    return res
      .status(200)
      .json({ message: "User information updated successfully" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
