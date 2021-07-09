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
        throw new Error('Error getting user');
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

        throw new Error('Error creating the user');
      }
    },
  },
};
