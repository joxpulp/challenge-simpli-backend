import { MongoClient } from 'mongodb';
import { CONFIG } from '../../utils/config/config';

export const client = new MongoClient(CONFIG.MONGO_URI);
export const db = client.db();
