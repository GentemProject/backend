import jwt from 'jsonwebtoken';

import { env, consts } from '../../config';

import { JwtToken, RefreshTokenModel } from './';

export async function generateAccessToken(payload: JwtToken) {
  return jwt.sign({ payload }, env.JWT_TOKEN_SECRET, {
    expiresIn: consts.EXPIRES_TOKEN_IN,
  });
}

export async function verifyAccessToken(token: string) {
  return jwt.verify(token, env.JWT_TOKEN_SECRET) as JwtToken;
}

export async function generateRefreshToken(payload: JwtToken) {
  const refreshToken = jwt.sign({ payload }, env.JWT_TOKEN_SECRET_REFRESH);

  await RefreshTokenModel.create({
    token: refreshToken,
  });

  return refreshToken;
}

export async function verifyRefreshToken(token: string) {
  const refreshToken = await RefreshTokenModel.findOne({ token }).exec();
  if (!refreshToken) {
    throw new Error('No token was found.');
  }

  const payload = jwt.verify(token, env.JWT_TOKEN_SECRET_REFRESH) as JwtToken;

  return generateAccessToken(payload);
}
