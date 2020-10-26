import { UserModel } from './model';
import { logger } from '../../utils';

export async function getUser(options: { userId?: string; email?: string }) {
  try {
    let filters = {};

    if (options.userId) {
      filters = { ...filters, _id: options.userId };
    }

    if (options.email) {
      filters = { ...filters, email: options.email };
    }

    logger.child(filters).info('filters getUser controller');
    return await UserModel.findOne(filters).exec();
  } catch (error) {
    logger.child(error).error('error getUser controller');
    return null;
  }
}

export async function createUser(options: {
  isAdmin: boolean;
  name: string;
  email: string;
  password: string;
}) {
  try {
    logger.child(options).info('options createUser controller');
    return await UserModel.create(options);
  } catch (error) {
    logger.child(error).error('error createUser controller');
    return null;
  }
}
