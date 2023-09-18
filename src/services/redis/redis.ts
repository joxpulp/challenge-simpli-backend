import { createClient } from 'redis';

export const client = createClient({
  password: 'Q6wNbtWixg2hMYccND34sUB8kUkIJRjB',
  socket: {
    host: 'redis-18537.c11.us-east-1-2.ec2.cloud.redislabs.com',
    port: 18537
  }
});

client.connect().catch(console.error);
