import { countries } from './data';

import { logger } from '../../utils';

export const CountriesResolver = {
  Query: {
    countries: async () => {
      try {
        logger.info('query getCountries');

        return countries;
      } catch (error) {
        logger.error(`error getCountries: "${error.message}"`);
        return [];
      }
    },
  },
};
