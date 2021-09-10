import { logger } from '../../utils';
import { CausesResolver } from '../causes';

import { Organization, OrganizationModel } from './model';

export const OrganizationResolver = {
  Query: {
    organization: async (
      _root: any,
      options: {
        id: string;
        slug: string;
      },
    ) => {
      try {
        logger.info('query getOrganization');

        let filters = {};
        if (options.id) {
          filters = { ...filters, _id: options.id };
        }
        if (options.slug) {
          filters = { ...filters, slug: options.slug };
        }

        const organization = await OrganizationModel.findOne(filters).exec();

        return organization;
      } catch (error) {
        logger.error(`error getOrganizations: "${error.message}"`);
        return {};
      }
    },
    organizations: async (
      _root: any,
      options: {
        query: string;
        page: number;
        limit: number;
        orderBy: string;
        sortBy: string;
        causesId: string[];
        countries: string[];
        hasDonationLinks: boolean;
        hasDonationBank: boolean;
        hasDonationProducts: boolean;
      },
    ) => {
      try {
        logger.info('query getOrganizations');

        const limit = options.limit || 10;
        const page = options.page || 1;
        const orderBy = options.orderBy || 'createdAt';
        const sortBy = options.sortBy || 'asc';
        const sort = { [orderBy]: sortBy };

        let filters = {};
        if (options.causesId && options.causesId.length > 0) {
          const cleanedCausesId = options.causesId.filter(causeId => {
            return causeId !== null || causeId !== '';
          });
          filters = {
            ...filters,
            causesId: { $all: cleanedCausesId },
          };
        }

        if (options.countries && options.countries.length > 0) {
          const cleanedCountries = options.countries.filter(country => {
            return country !== null || country !== '';
          });
          filters = { ...filters, 'locations.countryCode': { $all: cleanedCountries } };
        }

        if (options.hasDonationBank) {
          filters = { ...filters, 'donations.key': 'donationsBank' };
        }

        if (options.hasDonationLinks) {
          filters = { ...filters, 'donations.key': 'donationsLinks' };
        }

        if (options.hasDonationProducts) {
          filters = { ...filters, 'donations.key': 'donationsProducts' };
        }

        const count = await OrganizationModel.find(filters).countDocuments();
        const rows = await OrganizationModel.find(filters)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .sort(sort)
          .limit(limit);

        const result = {
          count,
          rows,
        };
        return result;
      } catch (error) {
        logger.error(`error getOrganizations: "${error.message}"`);

        return {
          count: 0,
          rows: [],
        };
      }
    },
  },
  Mutation: {},
  Organization: {
    causes: async (organization: Organization) => {
      const causes = CausesResolver.Query.causes(null, {
        ids: organization.causesId,
      });

      return causes;
    },
  },
};
