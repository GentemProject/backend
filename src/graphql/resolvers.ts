import { authMutations } from '../services/auth';
import { usersQueries, userMutations } from '../services/users';
import { causesMutations, causesQueries } from '../services/causes';
import {
  organizationsMutations,
  organizationsQueries,
  OrganizationsTypes,
} from '../services/organizations';

export const resolvers: any = {
  Query: {
    ...usersQueries,
    ...causesQueries,
    ...organizationsQueries,
  },
  Mutation: {
    ...authMutations,
    ...userMutations,
    ...causesMutations,
    ...organizationsMutations,
  },
  ...OrganizationsTypes,
};
