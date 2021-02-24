import mongoose from 'mongoose';
import { logger } from '../utils';
import { env } from '../config';

let isConnected = false;

export async function connectDatabase() {
  if (isConnected) {
    logger.info('database is connected from cache.');
    return true;
  }

  try {
    await mongoose.connect(env.X_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: env.X_MONGO_DATABASE,
    });
    isConnected = true;
    logger.info('database is connected.');

    return true;
  } catch (error) {
    logger.child({ error }).error('database connection failed.');
    throw new Error('database connection failed.');
  }
}
