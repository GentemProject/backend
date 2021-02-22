import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import { logger } from '../utils';
import { verifyAccessToken } from '../lib';
import { UsersModel } from '../services/users';

export async function getAuth({ req }: ExpressContext) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new Error('No authorization in request.');
    }

    const accessToken = authorization.split(' ')[1];
    const payloadToken = await verifyAccessToken(accessToken);

    const user = await UsersModel.findById(payloadToken.userId);
    if (!user) {
      throw new Error('No user was found in token');
    }

    logger.child({ userId: user.id, isAdmin: user.isAdmin }).info('middleware getAuth token');

    return { userId: user.id, isAdmin: user.isAdmin };
  } catch (error) {
    logger.child({ error: error.message }).warn('middleware getAuth token error');
    return { userId: null, isAdmin: false };
  }
}
