import mongoose from 'mongoose';
import data from './oldOrganizationsData.json';

import newCausesData from './causesMigrated.json';
import oldCausesData from './oldCausesData.json';

import { connectDatabase } from '../middlewares';
import { Organization, OrganizationModel } from '../services';

async function main() {
  try {
    const organizations = data;
    console.log('initializing migration....');

    console.log('initializing database....');
    await connectDatabase();

    console.log('deleting all old data....');
    await OrganizationModel.deleteMany({});

    console.log('mapping....');
    const organizationsToInsert: Organization[] = organizations.map(organization => {
      const oldCausesNames = oldCausesData.data
        .filter(cause => organization.primaryData.causeId.includes(cause.cat_id[0]))
        .map(cause => cause.cat_name);

      const newCauses = newCausesData
        .filter(cause => oldCausesNames.includes(cause.name))
        .map(cause => mongoose.Types.ObjectId(cause._id));

      return {
        ownerId: undefined,
        adminInfo: {
          adminFullName: organization.adminInfo?.adminName,
          adminEmail: organization.adminInfo?.adminEmail,
        },
        contact: {
          email: organization.contact?.email,
          phone: organization.contact?.phone,
          website: organization.contact?.website,
        },
        donationData: {
          donationLinks: [organization.donationData?.link || ''],
          donationsProducts: organization.donationData?.products,
          donationBankAccountName: organization.donationData?.bankAccount,
        },
        location: {
          city: organization.location?.city || '',
          country: organization.location?.country || '',
          coordenateX: organization.location?.coordenates?.x || 0,
          coordenateY: organization.location?.coordenates?.y || 0,
        },
        primaryData: {
          slug: organization.slug,
          logo: organization.primaryData.logo,
          name: organization.primaryData.name,
          goal: organization.primaryData.objective,
          description: organization.primaryData.description,
          useDonationsFor: organization.primaryData.howUseDonation,
          causesId: newCauses,
        },
        socialMedia: {
          facebookUrl: organization.socialMedia?.facebook,
          instagramUrl: organization.socialMedia?.instagram,
          twitterUrl: organization.socialMedia?.twitter,
          whatsappUrl: organization.socialMedia?.whatsapp
            ? `https://wa.me/${organization.socialMedia?.whatsapp}`
            : '',
        },
      };
    });

    console.log('Inserting in database....');
    await OrganizationModel.create(organizationsToInsert);

    console.log('success!');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando script:', error);
  }
  process.exit(0);
}

main();
