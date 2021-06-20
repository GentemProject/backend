import fs from 'fs';
import data from './oldCausesData.json';

import { CauseModel } from '../services';
import { connectDatabase } from '../middlewares';

async function main() {
  try {
    console.log('initializing migration....');
    const causes = data.data;

    console.log('initializing database....');
    await connectDatabase();

    console.log('deleting all old data...');
    await CauseModel.deleteMany({});

    console.log('mapping...');
    const causesToInsert = causes.map(cause => {
      return {
        name: cause.cat_name,
      };
    });

    console.log('inserting in database...');
    const newCauses = await CauseModel.create(causesToInsert);

    console.log('creating json file');
    const toSave = JSON.stringify(newCauses);
    fs.writeFileSync(`${__dirname}/causesMigrated.json`, toSave);

    console.log('success!');
    process.exit(0);
  } catch (error) {
    console.error('Error ejecutando script:', error);
  }
  process.exit(0);
}

main();
