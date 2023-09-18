import { createClient } from 'redis';
import { CONFIG } from '../../utils/config/config';
import { logger } from '../../utils/logs/logger';

export const client = createClient({
  username: 'default',
  password: CONFIG.REDIS_PWD,
  socket: {
    host: CONFIG.REDIS_HOST,
    port: parseInt(CONFIG.REDIS_PORT)
  }
});

export function setCache(cacheKey: string, data: object) {
  const daysToSeconds = 24 * 3600;
  client.setEx(cacheKey, daysToSeconds, JSON.stringify(data));
}

(async () => {
  try {
    await client.connect();
    logger.info('Redis connected');
  } catch (error) {
    logger.info(error);
  }
})();
