import jwt from 'jsonwebtoken';

import { env, consts } from '../config';

import { RefreshTokenModel } from '../services/auth';

interface JwtPayloadSign {
  userId: string;
  isAdmin: boolean;
}
interface JwtPayloadVerify extends JwtPayloadSign {
  iat: number;
}

export async function createAccessToken(payload: JwtPayloadSign) {
  return jwt.sign(payload, env.JWT_TOKEN_SECRET, {
    expiresIn: consts.EXPIRES_TOKEN_IN,
  });
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_TOKEN_SECRET) as JwtPayloadVerify;
}

export async function createRefreshToken(payload: JwtPayloadSign) {
  const refreshToken = jwt.sign(payload, env.JWT_TOKEN_SECRET_REFRESH);

  await RefreshTokenModel.create({
    token: refreshToken,
  });

  return refreshToken;
}

export async function verifyRefreshToken(token: string) {
  const refreshToken = await RefreshTokenModel.findOne({ token });
  if (!refreshToken) {
    throw new Error('No refresh token was found.');
  }

  const payload = jwt.verify(token, env.JWT_TOKEN_SECRET_REFRESH) as JwtPayloadVerify;

  const newAccessToken = createAccessToken({
    userId: payload.userId,
    isAdmin: payload.isAdmin,
  });

  return newAccessToken;
}
