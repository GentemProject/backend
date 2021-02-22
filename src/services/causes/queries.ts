import { logger } from '../../utils';

import { Cause, CausesModel } from './model';

export const causesQueries = {
  getCauses: async (_root: any, options: { causesIds: string[] }): Promise<Cause[]> => {
    try {
      logger.info('query getCauses');

      let find = {};

      if (options.causesIds) {
        find = {
          _id: {
            $in: options.causesIds,
          },
        };
      }

      const causes = await CausesModel.find(find);

      return causes;
    } catch (error) {
      throw new Error(error);
    }
  },
};
