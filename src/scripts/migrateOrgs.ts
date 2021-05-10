import mongoose from 'mongoose';
import data from './oldOrganizationsData.json';
import newCausesData from './causesMigrated.json';
import oldCausesData from './oldCausesData.json';

import { OrganizationModel } from '../services/organizations';
import { connectDatabase } from '../middlewares';

async function main() {
  try {
    const organizations = data;
    console.log('initializing migration....');

    console.log('initializing database....');
    await connectDatabase();

    console.log('mapping....');
    const organizationsToInsert = organizations.map(organization => {
      const oldCausesNames = oldCausesData.data
        .filter(cause => organization.primaryData.causeId.includes(cause.cat_id[0]))
        .map(cause => cause.cat_name);
      const newCauses = newCausesData
        .filter(cause => oldCausesNames.includes(cause.name))
        .map(cause => mongoose.Types.ObjectId(cause._id));

      return {
        name: organization.primaryData.name || '',
        slug: organization.slug || '',

        causesIds: newCauses,

        goal: organization.primaryData.objective || 'no goal',
        description: organization.primaryData.description || 'no description',
        howItIsUsingDonations:
          organization.primaryData.howUseDonation || 'no how it is using donations',

        logoUrl: organization.primaryData.logo || 'https://gentem.org/logoDefault.png',
        wallUrl: '',

        city: organization.location?.city || '',
        state: '',
        country: organization.location?.country || '',
        address: '',
        coordenateX: organization.location?.coordenates?.x || 0,
        coordenateY: organization.location?.coordenates?.y || 0,

        contactEmail: organization.contact?.email || '',
        contactPhone: organization.contact?.phone || '',
        contactWebsite: organization.contact?.website || '',

        userId: '',
        adminName: organization.adminInfo?.adminName || '',
        adminEmail: organization.adminInfo?.adminEmail || '',

        facebookUrl: organization.socialMedia?.facebook || '',
        instagramUrl: organization.socialMedia?.instagram || '',
        twitterUrl: organization.socialMedia?.twitter || '',
        whatsappPhone: organization.socialMedia?.whatsapp || '',

        donationProducts: organization.donationData?.products || '',
        donationLinks: [organization.donationData?.link || ''],
        donationBankAccountName: organization.donationData?.bankAccount || '',
        donationBankAccountType: '',
        donationBankAccountNumber: '',
      };
    });

    console.log('Inserting in database ...');

    await OrganizationModel.create(organizationsToInsert);
    console.log('success!');

    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando script:', error);
  }
  process.exit(0);
}

main();
