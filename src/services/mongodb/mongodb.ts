import { MongoClient } from 'mongodb';
import { CONFIG } from '../../utils/config/config';

export const client = new MongoClient(CONFIG.MONGO_URI, {
  maxPoolSize: 20
});

export const db = client.db();
