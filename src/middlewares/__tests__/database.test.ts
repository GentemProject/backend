import { closeDatabaseConnection, connectDatabase, isConnected } from '../database';

describe('database tests', () => {
  beforeAll(async () => {
    return await connectDatabase();
  });

  test('should connect to the database', () => {
    expect(isConnected).toBe(true);
  });

  afterAll(async () => {
    return await closeDatabaseConnection();
  });
});
