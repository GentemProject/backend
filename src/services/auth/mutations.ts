import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';

import { Context } from '../../graphql';
import { logger } from '../../utils';

import { createUser, getUser } from '../users';
import { generateAccessToken } from '.';
import { generateRefreshToken } from './controller';

export const authMutations = {
  signUp: async (
    _root: any,
    options: { name: string; email: string; password: string },
    context: Context,
  ) => {
    try {
      logger.info('mutation signUp');

      const userId = context.userId;
      if (userId) {
        throw new AuthenticationError('You are logged.');
      }

      // then we save the user info in mongodb
      logger.info('creating user in mongodb...');
      const user = await createUser({
        isAdmin: false,
        name: options.name,
        email: options.email,
        password: options.password,
      });

      if (!user) {
        throw new Error('Error creating user.');
      }

      // then create the jwt token
      logger.info('creating jwt token...');
      const payload = {
        userId: user.id,
        isAdmin: user.isAdmin,
      };
      const accessToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);

      return { accessToken, refreshToken, user };
    } catch (error) {
      throw new Error(error);
    }
  },
  signIn: async (_root: any, options: { email: string; password: string }, context: Context) => {
    try {
      logger.info('mutation signIn');

      const userId = context.userId;
      if (userId) {
        throw new AuthenticationError('You are logged.');
      }

      logger.info('verifying user in mongodb...');

      // Get the user by email
      const user = await getUser({ email: options.email });
      if (!user) {
        throw new AuthenticationError('The user do not exists.');
      }

      // Then we validate the password
      const isValid = await bcrypt.compare(options.password, user.password);
      if (!isValid) {
        throw new Error('Invalid password.');
      }

      // then create the jwt token
      logger.info('creating jwt token...');
      const payload = {
        userId: user.id,
        isAdmin: user.isAdmin,
      };
      const accessToken = await generateAccessToken(payload);
      const refreshToken = await generateRefreshToken(payload);

      return { accessToken, refreshToken, user };
    } catch (error) {
      throw new Error(error);
    }
  },
};
