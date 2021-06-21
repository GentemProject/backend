import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { env } from '../config';

export class Auth0Api {
  client: jwksClient.JwksClient;

  constructor() {
    this.client = jwksClient({
      jwksUri: `https://${env.X_AUTH0_DOMAIN}/.well-known/jwks.json`,
    });
  }

  getKey(header: any, cb: any) {
    this.client.getSigningKey(header.kid, function (_err, key) {
      const signingKey = (key as any).publicKey || (key as any).rsaPublicKey;
      cb(null, signingKey);
    });
  }

  verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.getKey,
        {
          audience: env.X_AUTH0_CLIENT_ID,
          issuer: `https://${env.X_AUTH0_DOMAIN}/`,
          algorithms: ['RS256'],
        },
        (err, decoded) => {
          if (err) {
            return reject(err);
          }
          resolve(decoded);
        },
      );
    });
  }
}
