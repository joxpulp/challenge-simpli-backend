import { MongoClient } from 'mongodb';
import { CONFIG } from '../../utils/config/config';
import { logger } from '../../utils/logs/logger';

export const client = new MongoClient(CONFIG.MONGO_URI, {
  maxPoolSize: 20
});

export async function mongoConnect() {
  try {
    await client.connect();
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(error);
  }
}

export const db = client.db();
