import { join } from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import { env } from '../config';
import {
  AuthResolver,
  ApolloResolver,
  CausesResolver,
  OrganizationResolver,
  UserResolver,
} from '../services';

import { context } from './apollo-context';
import { plugins } from './apollo-plugins';

export const typeDefs = mergeTypeDefs(loadFilesSync(join(__dirname, '../services/**/*.graphql')));
export const resolvers = [
  ApolloResolver,
  AuthResolver,
  CausesResolver,
  OrganizationResolver,
  UserResolver,
];

export const apolloServerConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  plugins,
  context,
  introspection: env.isDevelopment,
  playground: env.isDevelopment,
};
