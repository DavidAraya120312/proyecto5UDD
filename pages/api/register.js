import { connectToDb } from '../../lib/connectDb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    const db = await connectToDb();
    const collection = db.collection('users');

    const existingUser = await collection.findOne({ username });

    if (existingUser) {
      return res.status(400).send('El usuario ya existe');
    }

    await collection.insertOne({ username, password });
    return res.status(200).send('Usuario registrado con éxito');
  }

  res.status(405).end(); // Method not allowed
}
