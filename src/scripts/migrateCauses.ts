import fs from 'fs';
import data from './oldCausesData.json';

import { CausesModel } from '../services/causes';
import { connectDatabase } from '../middlewares';

async function main() {
  try {
    const causes = data;
    console.log('initializing migration....');

    console.log('initializing database....');
    await connectDatabase();

    console.log('mapping...');
    const causesToInsert = causes.data.map(cause => {
      return {
        name: cause.cat_name,
      };
    });

    console.log('inserting in database...');
    const newCauses = await CausesModel.create(causesToInsert);

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
