import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'MONGO_URL'
};
