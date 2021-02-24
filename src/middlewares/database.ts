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
    logger.info('start databse connection.');
    await mongoose.connect(env.X_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: env.X_MONGO_DATABASE,
    });
    isConnected = true;
    logger.info('database is connected.');

    return true;
  } catch (error) {
    console.log(error);
    logger.child({ error }).error('database connection failed.');
    return false;
  }
}
