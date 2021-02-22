import { Context } from '../../graphql';
import { logger } from '../../utils';
import { User, UsersModel } from './model';

export const userMutations = {
  createUser: async (
    _root: any,
    options: { name: string; email: string; password: string; isAdmin: boolean },
  ): Promise<User> => {
    try {
      logger.info('mutation: createUser');

      const userExists = await UsersModel.findOne({ email: options.email });
      if (userExists) {
        throw new Error(`User with email ${options.email} already exists.`);
      }

      const userCreated = await UsersModel.create({
        name: options.name,
        email: options.email,
        password: options.password,
        isAdmin: options.isAdmin,
      });
      if (!userCreated) {
        throw new Error('Cannot create a new user');
      }

      return userCreated;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteUser: async (
    _root: any,
    options: { userId: string },
    context: Context,
  ): Promise<boolean> => {
    try {
      logger.info('mutation: deleteUser');

      if (!context.isAdmin) throw new Error('You are not an admin. Sorry.');

      const userExists = await UsersModel.findById(options.userId);
      if (!userExists) throw new Error('User not exists.');

      const success = await UsersModel.deleteOne({ _id: options.userId });

      if (!success.ok) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error('mutation: deleteUser error', { error: error.message });
      throw new Error(error);
    }
  },
};
