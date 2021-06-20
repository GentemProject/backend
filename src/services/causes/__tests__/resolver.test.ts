import { closeDatabaseConnection, connectDatabase } from '../../../middlewares';
import { CausesResolver } from '../resolver';

describe('Causes service tests', () => {
  const mock = {
    name: 'My test cause',
    slug: 'my-test-cause',
  };
  const causeCached = {
    id: '',
  };

  beforeAll(async () => {
    await connectDatabase();
  });

  test('should return null, trying to create a cause without name', async () => {
    const newCause = await CausesResolver.Mutation.createCause(null, {
      input: { name: '' },
    });
    expect(newCause).toBeNull();
  });

  test('should create a cause', async () => {
    const { name } = mock;
    const newCause = await CausesResolver.Mutation.createCause(null, {
      input: { name },
    });
    if (newCause) {
      causeCached.id = newCause._id;
    }
    expect(newCause).not.toBeNull();
  });

  test('should fail to try create a new cause with the same name', async () => {
    const { name } = mock;
    const newCause = await CausesResolver.Mutation.createCause(null, {
      input: { name },
    });
    expect(newCause).toBeNull();
  });

  test('should return a specific cause by slug', async () => {
    const { slug } = mock;
    const cause = await CausesResolver.Query.cause(null, { slug });
    expect(cause).not.toBeNull();
  });

  test('should return a specific cause by id', async () => {
    const { id } = causeCached;
    const cause = await CausesResolver.Query.cause(null, { id });
    expect(cause).not.toBeNull();
  });

  test('should have at least one cause', async () => {
    const causes = await CausesResolver.Query.causes(null, {});
    expect(causes.length).toBeGreaterThanOrEqual(1);
  });

  test('should delete a cause', async () => {
    const { slug } = mock;
    const isDeleted = await CausesResolver.Mutation.deleteCause(null, { slug });
    expect(isDeleted).toBe(true);
  });

  afterAll(async () => {
    return await closeDatabaseConnection();
  });
});
