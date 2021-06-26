import { typeDefs, resolvers } from '../apollo';

describe('apollo tests', () => {
  test('should have at least one typedef', () => {
    const definitionsCount = typeDefs.definitions.length;
    expect(definitionsCount).toBeGreaterThanOrEqual(1);
  });
  test('should have at least one resolver', () => {
    const resovlersCount = resolvers.length;
    expect(resovlersCount).toBeGreaterThanOrEqual(1);
  });
});
