import mongoose from 'mongoose';

import { logger } from '../utils';
import { env } from '../config';

export let isConnected = false;
export let connectionCached: typeof mongoose;

export async function connectDatabase() {
  if (isConnected) {
    logger.info('database is connected from cache.');
    return connectionCached;
  }

  try {
    logger.info('start databse connection.');
    const connection = await mongoose.connect(env.X_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: env.X_MONGO_DATABASE,
    });
    connectionCached = connection;
    isConnected = true;
    logger.info('database is connected.');

    return connection;
  } catch {
    logger.error('database connection failed.');
    return null;
  }
}

export async function closeDatabaseConnection() {
  try {
    logger.info('closing database connection.');
    await mongoose.connection.close();
    isConnected = false;

    return true;
  } catch {
    logger.error('database connection failed.');
    return false;
  }
}
