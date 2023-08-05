import { connectToDb } from '../../../lib/connectDb';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { email, password, fullname } = req.body;

  // Aquí deberías agregar validaciones para los datos recibidos

  const db = await connectToDb();

  try {
    const plaintextPassword = password;

    const result = await db.collection('users').insertOne({ email, password: plaintextPassword, fullname });

    if (result.acknowledged && result.insertedId) {
      const newUser = await db.collection('users').findOne({ _id: result.insertedId });
      if (newUser) {
        return res.status(200).json({ success: true, data: newUser });
      } else {
        console.error('No se pudo recuperar el usuario recién insertado');
        return res.status(500).json({ success: false, message: 'No se pudo recuperar el usuario registrado.' });
      }
    } else {
      console.error('Error con el resultado de inserción:', result);
      return res.status(500).json({ success: false, message: 'Error al registrar el usuario.' });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
