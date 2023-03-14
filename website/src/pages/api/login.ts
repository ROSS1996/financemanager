import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { headers } = await axios.post(
      `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/login`,
      {
        email: req.body.email,
        password: req.body.password,
      }
    );

    const token = headers.authorization;
    const userId = headers.userid;

    if (!token || !userId) {
      return res
        .status(400)
        .json({ message: "Token or user ID missing in headers" });
    }

    return res.status(200).json({ token, userId });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
