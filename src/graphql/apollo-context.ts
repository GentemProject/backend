import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { connectDatabase, getAuth } from '../middlewares';

export interface Context {
  userId: string;
  isAdmin: boolean;
}

export const context = async (context: ExpressContext): Promise<Context> => {
  await connectDatabase();
  const auth = await getAuth(context);

  return auth;
};
