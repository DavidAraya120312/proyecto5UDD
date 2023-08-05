import { MongoClient } from 'mongodb';

let cachedDb = null;

export const connectToDb = async () => {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db('muestra_mflix');
  cachedDb = db;
  return db;
};
