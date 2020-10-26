import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { logger } from '../utils';
import { getUser } from '../services/users';
import { verifyAccessToken } from '../services/auth';

export async function getAuth(context: ExpressContext) {
  try {
    const { req } = context;
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new Error('No authorization in request');
    }

    const token = authorization.split(' ')[1];

    const { userId } = await verifyAccessToken(token);

    const user = await getUser({ userId });

    if (!user) {
      throw new Error('No user');
    }

    logger.child({ userId: user._id, isAdmin: user.isAdmin }).info('middleware getAuth token');

    return { userId: user._id, isAdmin: user.isAdmin };
  } catch (error) {
    logger.child({ error: error.message }).warn('middleware getAuth token error');
    return { userId: null, isAdmin: false };
  }
}
