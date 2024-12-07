import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Mock authentication
    if (email === 'test@example.com' && password === 'password') {
      res.status(200).json({ token: 'mock-token', user: { id: 1, name: 'Test User', role: 'USER' } });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
