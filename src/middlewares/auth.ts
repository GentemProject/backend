import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { FirebaseApi } from '../lib/firebaseApi';

import { env } from '../config';
import { logger } from '../utils';
import { UserModel } from '../services';

export const firebaseAdmin = new FirebaseApi({
  databaseUrl: env.X_FIREBASE_DB_URL,
  projectId: env.X_FIREBASE_PROJECT_ID,
  clientEmail: env.X_FIREBASE_CLIENT_EMAIL,
  privateKey: JSON.parse(`"${env.X_FIREBASE_PRIVATE_KEY}"`),
});

export async function getAuth({ req }: ExpressContext) {
  try {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      return { user: null };
    }

    const token = authorization.split(' ')[1];
    const decodedToken = await firebaseAdmin.verifyIdToken({
      token,
    });

    const user = await UserModel.findOne({ firebaseId: decodedToken.uid });
    if (!user) {
      return { user: null };
    }

    return { user };
  } catch (error) {
    logger.child({ error: error.message }).warn('middleware getAuth token error');
    return { user: null };
  }
}
