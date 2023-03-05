import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await axios.get('http://localhost:3000/userInfo', {
      headers: { Authorization: req.headers.authorization },
    });
    return res.status(200).json({ name: data.info.name, nickname: data.info.nickname, email: data.info.email });
  } catch (error: any) {
    if (error.response) {
      return res.status(error.response.status).json({ message: error.response.data.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
}
