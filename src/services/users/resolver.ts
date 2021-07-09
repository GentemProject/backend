import { Context } from '../../graphql';
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
      options: { input: { firebaseId: string; name: string; email: string; password: string } },
    ) => {
      try {
        logger.info('mutation createUser');
        const newUser = await UserModel.create(options.input);

        logger.info('mutation createUser finished');

        return newUser;
      } catch (error) {
        logger.error(`error createUser: "${error.message}"`);

        throw new Error('Error creating the user');
      }
    },
  },
};
