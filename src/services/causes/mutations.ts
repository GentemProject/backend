import { AuthenticationError } from 'apollo-server-express';

import { Context } from '../../graphql';
import { logger } from '../../utils';

import { Cause, CausesModel } from './model';

export const causesMutations = {
  createCause: async (_root: any, options: { name: string }, context: Context): Promise<Cause> => {
    try {
      logger.info('mutation: createCause');

      if (!context.isAdmin) {
        throw new AuthenticationError('Only admins can create causes.');
      }

      const causeCreated = await CausesModel.create(options);

      return causeCreated;
    } catch (error) {
      logger.error('mutation: createCause error', { error: error.message });
      throw new Error(error);
    }
  },
  deleteCause: async (
    _root: any,
    options: { causeId: string },
    context: Context,
  ): Promise<boolean> => {
    try {
      logger.info('mutation createCause');

      if (!context.isAdmin) {
        throw new AuthenticationError('Only admins can delete causes.');
      }

      const success = await CausesModel.deleteOne(options);

      return success ? true : false;
    } catch (error) {
      logger.error('mutation: createCause error', { error: error.message });
      throw new Error(error);
    }
  },
};
