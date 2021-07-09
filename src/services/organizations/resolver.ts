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
        const sort = { createdAt: 1 };

        let filters = {};
        if (options.causesId && options.causesId.length > 0) {
          filters = { ...filters, causesId: options.causesId };
        }

        if (options.countries) {
          filters = { ...filters, countries: { $in: options.countries } };
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

        const count = await OrganizationModel.find(filters).countDocuments();
        const rows = await OrganizationModel.find(filters)
          .skip((page - 1) * limit)
          .limit(limit)
          .sort(sort);

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
