import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body.password != req.body.confirm) {
    return res.status(400).json({ message: "Passwords do not match"});
  }
  try {
    const { headers } = await axios.post('http://localhost:3000/register', {
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      nickname: req.body.nickname,
    });
    return res.status(201);
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
