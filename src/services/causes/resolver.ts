import { Types } from 'mongoose';

import { logger } from '../../utils';

import { CauseModel } from './model';

export const CausesResolver = {
  Query: {
    cause: async (_root: any, options: { id?: string; slug?: string }) => {
      try {
        logger.info('query getCause');

        let find = {};
        if (options.id) {
          find = { ...find, _id: options.id };
        }
        if (options.slug) {
          find = { ...find, slug: options.slug };
        }

        const result = await CauseModel.findOne(find);

        logger.info('query getCause finished');
        return result;
      } catch (error) {
        logger.error(`error getCause: "${error.message}"`);

        return null;
      }
    },
    causes: async (_root: any, options: { query?: string; ids?: string[] | Types.ObjectId[] }) => {
      try {
        logger.info('query getCauses');

        let find = {};
        if (options.ids) {
          find = { ...find, _id: { $in: options.ids } };
        }
        if (options.query) {
          find = { ...find, name: { $regex: options.query, $options: 'i' } };
        }

        const results = await CauseModel.find(find);

        logger.info('query getCauses finished');
        return results;
      } catch (error) {
        logger.error(`error getCauses: "${error.message}"`);

        return [];
      }
    },
  },
  Mutation: {
    createCause: async (
      _root: any,
      options: { input: { name: string } },
      // context: Context,
    ) => {
      try {
        logger.info('mutation createCause');

        // if (!context.isAdmin) {
        //   throw new AuthenticationError('Only admins can create causes.');
        // }

        const newCause = await CauseModel.create(options.input);

        logger.info('mutation createCause finished');
        return newCause;
      } catch (error) {
        logger.error(`error createCauses: "${error.message}"`);

        return null;
      }
    },
    deleteCause: async (
      _root: any,
      options: { id?: string; slug?: string },
      // context: Context,
    ) => {
      try {
        logger.info('mutation deleteCause');

        // if (!context.isAdmin) {
        //   throw new AuthenticationError('Only admins can delete causes.');
        // }

        const causeDeleted = await CauseModel.deleteOne(options);

        const itemsDeleted = causeDeleted.deletedCount || 0;
        const hasItemsDeleted = itemsDeleted > 0;

        logger.info('mutation deleteCause finished');
        return hasItemsDeleted;
      } catch (error) {
        logger.error(`error deleteCauses: "${error.message}"`);

        return false;
      }
    },
  },
};
