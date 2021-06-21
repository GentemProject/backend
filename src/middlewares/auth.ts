import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { logger } from '../utils';

export async function getAuth({ req }: ExpressContext) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new Error('No authorization in request.');
    }

    const accessToken = authorization.split(' ')[1];

    console.log({ accessToken });

    return { userId: '234423', isAdmin: false };
  } catch (error) {
    logger.child({ error: error.message }).warn('middleware getAuth token error');
    return { userId: '234423', isAdmin: false };
  }
}
