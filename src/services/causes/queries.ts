import { logger } from '../../utils';

import { getCauses } from './controller';

export const causesQueries = {
  getCauses: async () => {
    try {
      logger.info('query getCauses');

      const causes = await getCauses({});

      return causes;
    } catch (error) {
      throw new Error(error);
    }
  },
};
