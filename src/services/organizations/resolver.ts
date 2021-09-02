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
        donationLinks: boolean;
        donationBank: boolean;
        donationProducts: boolean;
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
          filters = { ...filters, countries: { $all: cleanedCountries } };
        }

        if (options.donationLinks) {
          filters = { ...filters, donationLinks: { $exists: true, $ne: [''], $not: { $size: 0 } } };
        }

        if (options.donationBank) {
          filters = { ...filters, donationBankAccountName: { $exists: true } };
        }

        if (options.donationProducts) {
          filters = { ...filters, donationsProducts: { $exists: true } };
        }

        console.log({ filters });

        const count = await OrganizationModel.find(filters).countDocuments();
        const rows = await OrganizationModel.find(filters)
          .skip(page > 0 ? (page - 1) * limit : 0)
          .sort(sort)
          .limit(limit);

        return {
          count,
          rows,
        };
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
