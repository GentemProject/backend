import { ApolloServerExpressConfig } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import { env } from '../config';
import { context } from './apollo-context';
import { plugins } from './apollo-plugins';
import { resolvers } from './resolvers';

const typeDefs = importSchema('./src/graphql/schema.graphql');

export const apolloServerConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  plugins,
  context,
  introspection: env.isDevelopment,
  playground: env.isDevelopment,
};
