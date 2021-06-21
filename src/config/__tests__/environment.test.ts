import { env } from '../../config';

describe('environment tests', () => {
  test('should have all environments variables', done => {
    expect(env.X_MONGO_URL).toBeDefined();
    expect(env.X_MONGO_DATABASE).toBeDefined();
    expect(env.JWT_TOKEN_SECRET).toBeDefined();
    expect(env.JWT_TOKEN_SECRET_REFRESH).toBeDefined();
    expect(env.NODE_ENV).toBeDefined();
    expect(env.PORT).toBeDefined();

    done();
  });
});
