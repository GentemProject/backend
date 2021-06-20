import { join } from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import { env } from '../config';
import { ApolloResolver, CausesResolver, OrganizationResolver } from '../services';

import { context } from './apollo-context';
import { plugins } from './apollo-plugins';
import { resolvers as oldResolvers } from './resolvers';

export const typeDefs = mergeTypeDefs(loadFilesSync(join(__dirname, '../services/**/*.graphql')));
export const resolvers = [ApolloResolver, CausesResolver, OrganizationResolver, oldResolvers];

export const apolloServerConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  plugins,
  context,
  introspection: env.isDevelopment,
  playground: env.isDevelopment,
};
