import { logger } from '../../utils';

import { verifyRefreshToken } from '.';

export const authQueries = {
  getNewAccessToken: async (_root: any, options: { token: string }) => {
    try {
      logger.info('query getToken');

      const token = options.token;
      if (!token) {
        throw new Error('You need provide a token.');
      }

      const accessToken = verifyRefreshToken(token);

      return accessToken;
    } catch (error) {
      throw new Error(error);
    }
  },
};
