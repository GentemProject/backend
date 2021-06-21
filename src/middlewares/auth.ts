import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { logger } from '../utils';
import { Auth0Api } from '../lib';

export async function getAuth({ req }: ExpressContext) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new Error('No authorization in request.');
    }

    const accessToken = authorization.split(' ')[1];

    const auth0 = new Auth0Api();
    const user = auth0.verifyToken(accessToken);

    console.log({ user });

    // logger.child({ userId: user.id, isAdmin: user.isAdmin }).info('middleware getAuth token');

    return { userId: '234423', isAdmin: false };
  } catch (error) {
    logger.child({ error: error.message }).warn('middleware getAuth token error');
    return { userId: '234', isAdmin: false };
  }
}
