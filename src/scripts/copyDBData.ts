import fs from 'fs';

import { connectDatabase } from '../middlewares';
import { OrganizationModel, CauseModel } from '../services';

async function main() {
  try {
    console.log('initializing migration....');

    console.log('initializing database....');
    await connectDatabase();

    console.log('getting all old data....');
    const organizationsData = await OrganizationModel.find({});
    const causesData = await CauseModel.find({});

    fs.writeFileSync(
      `${__dirname}/organizationsSeptember2021.json`,
      JSON.stringify(organizationsData),
    );

    fs.writeFileSync(`${__dirname}/causesSeptember2021.json`, JSON.stringify(causesData));

    console.log('success!');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando script:', error);
  }
  process.exit(0);
}

main();
