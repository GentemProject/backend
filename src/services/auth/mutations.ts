import bcrypt from 'bcryptjs';
import { AuthenticationError } from 'apollo-server-express';

// import { Context } from '../../graphql';
import { logger } from '../../utils';

import { getUser } from '../users';
import { generateAccessToken } from '.';
import { generateRefreshToken } from './controller';

import { GoTrueClient } from '@supabase/gotrue-js';

export const authMutations = {
  signUp: async (_: any, options: { name: string; email: string; password: string }) => {
    try {
      logger.info('mutation signUp');

      // then we save the user info in mongodb
      logger.info('creating user in mongodb...');

      const auth = new GoTrueClient({
        url: 'https://jsovuatvsbclfuyaljkw.supabase.co',
        headers: {
          apikey:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxMTk4NjgzNiwiZXhwIjoxOTI3NTYyODM2fQ.qUIPUi0S-09j30UxUKvClM0S4fI3NFphy-JRCrv-JNI',
          Authorization: 'Bearer 855a15f2-9456-4de7-84ad-c8f76cc2da48',
        },
      });
      const data = await auth.api.signUpWithEmail(options.email, options.password);
      console.log('DATA');
      console.log(data);

      // const user = await createUser({
      //   isAdmin: false,
      //   name: options.name,
      //   email: options.email,
      //   password: options.password,
      // });

      // if (!user) {
      //   throw new Error('Error creating user.');
      // }

      // // then create the jwt token
      // logger.info('creating jwt token...');
      // const payload = {
      //   userId: user.id,
      //   isAdmin: user.isAdmin,
      // };
      // const accessToken = await generateAccessToken(payload);
      // const refreshToken = await generateRefreshToken(payload);

      return { accessToken: '', refreshToken: '', user: '' };
    } catch (error) {
      throw new Error(error);
    }
  },
  signIn: async (_: any, options: { email: string; password: string }) => {
    try {
      logger.info('mutation signIn');

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
