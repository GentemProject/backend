import bcrypt from 'bcryptjs';
import { logger } from '../../utils';
import { UserModel } from '../users';

export const AuthResolver = {
  Query: {},
  Mutation: {
    login: async (_root: any, options: { input: { email: string; password: string } }) => {
      try {
        logger.info('mutation login');

        const userExists = await UserModel.findOne({ email: options.input.email });
        if (!userExists) {
          throw new Error('User not exists.');
        }

        const isValidPassword = await bcrypt.compare(options.input.password, userExists.password);
        if (!isValidPassword) {
          throw new Error('Invalid password.');
        }

        // update last login
        await UserModel.updateOne({ _id: userExists.id }, { lastLoginAt: new Date() });

        logger.info('mutation login finished');
        return userExists;
      } catch (error) {
        logger.error(`error register: "${error.message}"`);

        throw new Error(error.message);
      }
    },
    register: async (
      _root: any,
      options: { input: { firebaseId: string; name: string; email: string; password: string } },
    ) => {
      try {
        logger.info('mutation register');
        const newUser = await UserModel.create(options.input);
        logger.info('mutation register finished');
        return newUser;
      } catch (error) {
        logger.error(`error register: "${error.message}"`);

        return null;
      }
    },
  },
};
