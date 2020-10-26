import { AuthenticationError } from 'apollo-server-express';

import { Context } from '../../graphql';
import { logger } from '../../utils';

import { createCause, deleteCause } from './controller';

export const causesMutations = {
  createCause: async (_root: any, options: { name: string }, context: Context) => {
    try {
      logger.info('mutation createCause');

      const { isAdmin } = context;

      if (!isAdmin) {
        throw new AuthenticationError('Only admins can create causes.');
      }
      const cause = await createCause(options);

      return cause;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteCause: async (_root: any, options: { causeId: string }, context: Context) => {
    try {
      logger.info('mutation createCause');

      const { isAdmin } = context;

      if (!isAdmin) {
        throw new AuthenticationError('Only admins can delete causes.');
      }
      const success = await deleteCause(options);

      return success;
    } catch (error) {
      throw new Error(error);
    }
  },
};
