import { newTypeDefs } from '../apollo';

describe('apollo tests', () => {
  test('should have at least one .graphql file in build folder', () => {
    expect(newTypeDefs.length).toBeGreaterThanOrEqual(1);
  });
});
