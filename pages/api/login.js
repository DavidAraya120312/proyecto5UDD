// pages/api/login.js
import { connectToDb } from '../../lib/connectDb'; // Ajusta la ruta relativa según la ubicación de tu archivo `connectDb`
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Método no permitido
  }

  const { email, password } = req.body;

  try {
    const db = await connectToDb(); // Usa la función correcta para conectar a la base de datos

    const user = await db.collection('users').findOne({ email });
    console.log("Usuario encontrado en la base de datos:", user);

    if (!user || password !== user.password) {
      return res.status(401).json({ message: 'Usuario o contraseña incorrectos' }); // Mensaje genérico
    }

    const passwordMatch = (password === user.password);

    console.log('¿Las contraseñas coinciden?:', passwordMatch);


    if (!passwordMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // No devolver la contraseña en la respuesta
    delete user.password;

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error en el endpoint de login:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
