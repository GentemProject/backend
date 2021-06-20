import * as envalid from 'envalid';
import path from 'path';

const { str } = envalid;

export const env = envalid.cleanEnv(
  process.env,
  {
    PORT: str({ default: '3000' }),
    NODE_ENV: str(),
    X_MONGO_URL: str(),
    X_MONGO_DATABASE: str(),
    X_AUTH0_ACCOUNT: str({ default: '' }),
    X_AUTH0_DOMAIN: str({ default: '' }),
    X_AUTH0_CLIENT_ID: str({ default: '' }),
    X_AUTH0_CLIENT_SECRET: str({ default: '' }),
    JWT_TOKEN_SECRET: str(),
    JWT_TOKEN_SECRET_REFRESH: str(),
  },
  { strict: true, dotEnvPath: path.resolve(__dirname, '../../.env') },
);
