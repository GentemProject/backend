import mongoose from 'mongoose';

import { env } from '../../config';

describe('database tests', () => {
  let database: typeof mongoose;

  beforeAll(async () => {
    database = await mongoose.connect(env.X_MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: env.X_MONGO_DATABASE,
    });
  });

  test('should connect to the database', () => {
    expect(database.connection.readyState).toBe(1);
  });

  afterAll(async () => {
    await database.connection.close();
  });
});
