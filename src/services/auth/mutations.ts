import bcrypt from 'bcryptjs';

import { UsersModel } from '../users';
import { logger } from '../../utils';
import { createAccessToken, createRefreshToken, verifyRefreshToken } from '../../lib';

export const authMutations = {
  signNewAccessToken: async (_root: any, options: { refreshToken: string }) => {
    try {
      logger.info('mutation: signNewToken');

      if (!options.refreshToken) {
        throw new Error('You need provide a refreshToken.');
      }

      const newAccessToken = await verifyRefreshToken(options.refreshToken);

      return newAccessToken;
    } catch (error) {
      throw new Error(error);
    }
  },
  signUp: async (_root: any, options: { name: string; email: string; password: string }) => {
    try {
      logger.info('mutation: signUp');

      const userExists = await UsersModel.findOne({ email: options.email });
      if (userExists) {
        throw new Error(`User with email ${options.email} already exists.`);
      }

      const userCreated = await UsersModel.create({
        name: options.name,
        email: options.email,
        password: options.password,
        isAdmin: false,
      });
      if (!userCreated) {
        throw new Error('Cannot create a new user');
      }

      // we create tokens
      const payload = {
        userId: userCreated.id,
        isAdmin: userCreated.isAdmin,
      };
      const accessToken = await createAccessToken(payload);
      const refreshToken = await createRefreshToken(payload);

      return { accessToken, refreshToken, user: userCreated as any };
    } catch (error) {
      throw new Error(error);
    }
  },
  signIn: async (_root: any, options: { email: string; password: string }) => {
    try {
      logger.info('mutation: signIn');

      const userExists = await UsersModel.findOne({ email: options.email });
      if (!userExists) {
        throw new Error(`User not exists.`);
      }

      const isValidPassword = await bcrypt.compare(options.password, userExists.password);
      if (!isValidPassword) {
        throw new Error('Invalid password.');
      }

      // update last login
      await UsersModel.updateOne({ _id: userExists.id }, { lastLoginAt: new Date() });

      // we create tokens
      const payload = {
        userId: userExists.id,
        isAdmin: userExists.isAdmin,
      };
      const accessToken = await createAccessToken(payload);
      const refreshToken = await createRefreshToken(payload);

      return { accessToken, refreshToken, user: userExists as any };
    } catch (error) {
      throw new Error(error);
    }
  },
};
