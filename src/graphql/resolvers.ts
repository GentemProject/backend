import { authMutations } from '../services/auth';
import { usersQueries, userMutations } from '../services/users';

export const resolvers: any = {
  Query: {
    ...usersQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
  },
};
