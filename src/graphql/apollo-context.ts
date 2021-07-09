import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { connectDatabase, getAuth } from '../middlewares';
import { User } from '../services';

export interface Context {
  user: User | null;
}

export const context = async (context: ExpressContext): Promise<Context> => {
  await connectDatabase();
  const auth = await getAuth(context);

  return auth;
};
