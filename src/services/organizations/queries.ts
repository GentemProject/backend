import { logger } from '../../utils';

import { OrganizationModel } from '.';

export const organizationsQueries = {
  getOrganization: async (_root: any, options: { organizationId: string; slug: string }) => {
    try {
      logger.info('query getOrganization');

      let filters = {};
      if (options.organizationId) {
        filters = { ...filters, _id: options.organizationId };
      }
      if (options.slug) {
        filters = { ...filters, slug: options.slug };
      }

      logger.child(filters).info('filters getOrganization query');

      const organization = await OrganizationModel.findOne(filters).exec();

      return organization;
    } catch (error) {
      logger.child(error).error('error getOrganization query');
      throw new Error(error);
    }
  },
  getOrganizations: async (
    _root: any,
    options: {
      query: string;
      page: number;
      limit: number;
      userId: string;
      causesIds: string[];
      country: string;
      donationProducts: string;
      donationBankAccountName: string;
      donationLinks: string;
    },
  ) => {
    try {
      logger.info('query getOrganizations');

      const limit = options.limit || 10;
      const page = options.page || 1;

      const sort = {
        createdAt: 1,
      };

      let filters = {};
      if (options.userId) {
        filters = { ...filters, userId: options.userId };
      }
      if (options.causesIds && options.causesIds.length > 0) {
        filters = { ...filters, causesIds: options.causesIds };
      }
      if (options.country) {
        filters = { ...filters, country: options.country };
      }
      if (options.donationProducts) {
        filters = { ...filters, donationProducts: options.donationProducts };
      }
      if (options.donationBankAccountName) {
        filters = { ...filters, donationBankAccountName: options.donationBankAccountName };
      }
      if (options.donationLinks) {
        filters = { ...filters, donationLinks: options.donationLinks };
      }

      logger.child(filters).info('filters getOrganizations query');

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
      logger.child(error).error('error getOrganizations query');
      throw new Error(error);
    }
  },
};
