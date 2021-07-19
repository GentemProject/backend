import { AuthenticationError } from 'apollo-server-express';
import { Context } from '../../graphql';
import { firebaseAdmin } from '../../middlewares';
import { logger } from '../../utils';

import { UserModel } from './model';

export const UserResolver = {
  Query: {
    getMe: async (_root: any, _options: any, context: Context) => {
      try {
        return context.user;
      } catch (error) {
        logger.error(`error getMe: "${error.message}"`);
        throw new Error(error.message);
      }
    },
    getUser: async (_root: any, options: { id?: string; query?: string }, context: Context) => {
      try {
        logger.info('query getUser');
        if (!context.user?.isAdmin) {
          throw new AuthenticationError('Only admin can get a user');
        }

        let filters = {};
        if (options.id) {
          filters = { ...filters, _id: options.id };
        }
        if (options.query) {
          filters = {
            ...filters,
            $or: [{ email: { $regex: options.query } }, { name: { $regex: options.query } }],
          };
        }

        const user = await UserModel.findOne(filters).exec();

        return user;
      } catch (error) {
        logger.error(`error getUser: "${error.message}"`);
        throw new Error(error.message);
      }
    },
    getUsers: async (
      _root: any,
      options: { query?: string; page?: number; limit?: number },
      context: Context,
    ) => {
      try {
        logger.info('query getUsers');
        if (!context.user?.isAdmin) {
          throw new AuthenticationError('Only admins can get users');
        }

        const limit = options.limit || 10;
        const page = options.page || 1;
        const sort = { createdAt: 1 };
        let filters = {};
        if (options.query) {
          filters = {
            ...filters,
            $or: [{ email: { $regex: options.query } }, { name: { $regex: options.query } }],
          };
        }

        const count = await UserModel.find(filters).countDocuments();
        const rows = await UserModel.find(filters)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort(sort);

        return {
          count,
          rows,
        };
      } catch (error) {
        logger.error(`error getUsers: "${error.message}"`);
        throw new Error(error.message);
      }
    },
  },
  Mutation: {
    createUser: async (
      _root: any,
      options: { input: { name: string; email: string; password: string } },
      context: Context,
    ) => {
      try {
        logger.info('mutation createUser');
        if (!context.user?.isAdmin) {
          throw new AuthenticationError('Only admin can create user');
        }

        //create firebase user
        const firebaseUser = await firebaseAdmin.createUser({
          email: options.input.email,
          password: options.input.password,
        });
        const newUser = await UserModel.create({ firebaseId: firebaseUser.uid, ...options.input });

        logger.info('mutation createUser finished');

        return newUser;
      } catch (error) {
        logger.error(`error createUser: "${error.message}"`);

        throw new Error(error.message);
      }
    },
  },
};
