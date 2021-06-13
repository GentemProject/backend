import { join } from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

import { env } from '../config';
import { context } from './apollo-context';
import { plugins } from './apollo-plugins';
import { resolvers } from './resolvers';

const oldTypeDefs = importSchema('./src/graphql/schema.graphql');
export const newTypeDefs = loadFilesSync(join(__dirname, '../services/**/*.graphql'));

const typeDefs = mergeTypeDefs([...newTypeDefs, oldTypeDefs]);

export const apolloServerConfig: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  plugins,
  context,
  mocks: true,
  introspection: env.isDevelopment,
  playground: env.isDevelopment,
};
