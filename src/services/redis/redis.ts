import { createClient } from 'redis';
import { CONFIG } from '../../utils/config/config';

export const client = createClient({
  password: CONFIG.REDIS_PWD,
  socket: {
    host: CONFIG.REDIS_HOST,
    port: parseInt(CONFIG.REDIS_PORT)
  }
});

client.connect().catch(console.error);
