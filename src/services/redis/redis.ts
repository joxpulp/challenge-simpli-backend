import { CONFIG } from '../../utils/config/config';
import Redis from 'ioredis';
import { logger } from '../../utils/logs/logger';

export const client = new Redis({
  port: parseInt(CONFIG.REDIS_PORT),
  host: CONFIG.REDIS_HOST,
  username: 'default',
  password: CONFIG.REDIS_PWD
});

export function setCache(cacheKey: string, data: object) {
  const DAY_TO_SECONDS = 24 * 3600;
  client.set(cacheKey, JSON.stringify(data), 'EX', DAY_TO_SECONDS);
}

export async function invalidateCache(cacheKey: string) {
  const cacheKeys = await client.keys(cacheKey);
  await client.del(cacheKeys);
}

client.on('connect', () => {
  logger.info('Redis Server Connected');
});
