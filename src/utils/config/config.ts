import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'MONGO_URL',
  REDIS_PWD: process.env.REDIS_PWD || 'REDIS PWD',
  REDIS_HOST: process.env.REDIS_HOST || 'REDIS HOST',
  REDIS_PORT: process.env.REDIS_PORT || 'REDIS PORT'
};
