import { env } from '../../config';

describe('environment tests', () => {
  test('should have all environments variables', done => {
    expect(env.X_MONGO_URL).toBeDefined();
    expect(env.X_MONGO_DATABASE).toBeDefined();
    expect(env.X_FIREBASE_CLIENT_EMAIL).toBeDefined();
    expect(env.X_FIREBASE_DB_URL).toBeDefined();
    expect(env.X_FIREBASE_PRIVATE_KEY).toBeDefined();
    expect(env.X_FIREBASE_PROJECT_ID).toBeDefined();
    expect(env.NODE_ENV).toBeDefined();
    expect(env.PORT).toBeDefined();

    done();
  });
});
