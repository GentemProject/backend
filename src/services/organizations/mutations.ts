// import mongoose from 'mongoose';
import { logger } from '../../utils';

// import { OrganizationModel } from '.';

export const organizationsMutations = {
  createOrganization: async (
    _root: any,
    options: {
      name: string;

      causesIds: string[];

      goal: string;
      description: string;
      howItIsUsingDonations: string;

      logoUrl: string;
      wallUrl?: string;

      city?: string;
      state?: string;
      country?: string;
      address?: string;
      mapUrl?: string;

      contactEmail?: string;
      contactPhone?: string;
      contactWebsite?: string;

      userId?: string;
      adminName?: string;

      facebookUrl?: string;
      instagramUrl?: string;
      twitterUrl?: string;
      whatsappPhone?: string;

      donationLinks?: string[];
      donationBankAccountName?: string;
      donationBankAccountType?: string;
      donationBankAccountNumber?: string;
    },
  ) => {
    try {
      logger.info('mutation createOrganization');
      console.log(options);

      // const organizationMapped = {
      //   ...options,
      //   causesIds: options.causesIds.map(causeId => mongoose.Types.ObjectId(causeId)),
      // };
      // const organization = await OrganizationModel.create(organizationMapped);
      return options;
    } catch (error) {
      logger.child(error).error('error getOrganizations controller');
      throw new Error(error);
    }
  },
};
