// pages/api/route.js

export default function handler(req, res) {
    if (req.method === 'GET') {
      res.status(200).json({ message: "Hello word" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  }
  