import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.body.password != req.body.confirm) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  try {
    const { headers } = await axios.post("http://localhost:3000/register", {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      confirm: req.body.confirm,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      birthdate: req.body.birthdate,
      country: req.body.country,
      phone: req.body.phone,
      address: req.body.address,
    });
    return res
      .status(200)
      .json({ message: "User account successfully created" });
  } catch (error: any) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}
