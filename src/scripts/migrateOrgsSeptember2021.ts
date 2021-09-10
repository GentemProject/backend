// import fs from 'fs';

import mongoose from 'mongoose';
import organizationsData from './organizationsSeptember2021.json';
import causesData from './causesSeptember2021.json';

import { connectDatabase } from '../middlewares';
import { Organization, OrganizationModel, CauseModel } from '../services';
import { countries } from '../services/countries';

async function main() {
  try {
    const organizations = organizationsData;
    const causes = causesData;
    console.log('initializing migration....');

    console.log('initializing database....');
    await connectDatabase();

    console.log('deleting all old data....');
    await OrganizationModel.deleteMany({});
    await CauseModel.deleteMany({});

    console.log('mapping....');
    const organizationsToInsert: Organization[] = organizations.map(organization => {
      const socialMedia = [
        {
          key: 'facebook',
          name: 'Facebook',
          url: organization.facebookUrl || 'null',
        },
        {
          key: 'instagram',
          name: 'Instagram',
          url: organization.instagramUrl || 'null',
        },
        {
          key: 'twitter',
          name: 'Twitter',
          url: organization.twitterUrl || 'null',
        },
        {
          key: 'whataspp',
          name: 'Whatsapp',
          url: organization.whatsappUrl || 'null',
        },
      ].filter(item => item.url !== 'null');

      const donations = [
        {
          key: 'donationsBank',
          title: 'Consigna a una cuenta bancaria',
          description: organization.donationBankAccountName || 'null',
        },
        {
          key: 'donationsProducts',
          title: 'Donar Productos',
          description: organization.donationsProducts || 'null',
        },
        {
          key: 'donationsLinks',
          title: 'Links para donar',
          description: organization.donationLinks[0] || 'null',
        },
      ].filter(item => item.description !== 'null');

      const country = organization.countries[0].normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const countryCode =
        countries.filter(
          currectCountry => currectCountry.name.toLowerCase() === country.toLowerCase(),
        )[0]?.code || '';

      return {
        ownersId: [],
        causesId: organization.causesId.map(cause => mongoose.Types.ObjectId(cause)),
        isPublished: true,
        name: organization.name,
        slug: organization.slug,
        logo: organization.logo,
        goal: organization.goal,
        description: organization.description,
        useDonationsFor: organization.useDonationsFor,
        email: organization.email,
        phone: organization.phone,
        website: organization.website,
        adminFullName: organization.adminFullName,
        adminEmail: organization.adminEmail,
        locations: [
          {
            address: organization.addresses[0],
            city: organization.cities[0],
            state: organization.states[0],
            country,
            countryCode,
            coordenateX: organization.coordenateX[0],
            coordenateY: organization.coordenateY[0],
          },
        ],
        socialMedia,
        donations,
        sponsors: [],
      };
    });

    console.log('Inserting in database....');

    // fs.writeFileSync(
    //   `${__dirname}/testSept2021.json`,
    //   JSON.stringify(organizationsToInsert, null, 2),
    // );
    await OrganizationModel.create(organizationsToInsert);
    await CauseModel.create(causes);

    console.log('success!');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando script:', error);
  }
  process.exit(0);
}

main();
