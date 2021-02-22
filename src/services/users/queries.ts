import { AuthenticationError } from 'apollo-server-express';

import { Context } from '../../graphql';
import { logger } from '../../utils';

import { User, UsersModel } from './model';

export const usersQueries = {
  getUsers: async (
    _root: any,
    options: {
      query?: string;
      page?: number;
      limit?: number;
      orderBy?: string;
      orderSort?: string;
    },
    context: Context,
  ): Promise<User[]> => {
    try {
      logger.info('query: getUsers');

      if (!context.isAdmin) throw new Error('You are not an admin. Sorry.');

      const { query, page = 1, limit = 10, orderBy = 'createdAt', orderSort = 'asc' } = options;
      const skips = limit * (page - 1);

      let find = {};
      if (query) {
        find = {
          $or: [
            { email: { $regex: query, $options: 'i' } },
            { name: { $regex: query, $options: 'i' } },
          ],
        };
      }

      const users = await UsersModel.find(find)
        .skip(skips)
        .limit(limit)
        .sort([[orderBy, orderSort === 'asc' ? 1 : -1]])
        .exec();

      return users;
    } catch (error) {
      throw new Error(error);
    }
  },
  getUser: async (_root: any, options: { userId: string }, context: Context): Promise<User> => {
    try {
      logger.info('query: getUser');

      if (!context.isAdmin) throw new Error('You are not an admin. Sorry.');

      const user = await UsersModel.findById(options.userId);

      if (!user) throw new Error('User not found.');

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
  getMe: async (_root: any, _options: any, context: Context): Promise<User> => {
    try {
      logger.info('query: getMe');

      if (!context.userId) throw new AuthenticationError('You must be authenticated.');

      const user = await UsersModel.findById(context.userId);

      if (!user) throw new Error('User not found.');

      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};
