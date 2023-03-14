import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data } = await axios.get(
      `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/userInfo`,
      {
        headers: { Authorization: req.headers.authorization },
      }
    );
    return res.status(200).json({
      firstname: data.info.firstname,
      username: data.info.username,
      email: data.info.email,
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
