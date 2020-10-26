import mongoose from 'mongoose';
import { consts } from '../../config';

import { RefreshTokenInterface } from './interface';

const RefreshTokenSchema = new mongoose.Schema({
  token: {
    index: true,
    type: String,
    required: true,
    unique: true,
  },
  createdAt: { type: Date, default: Date.now, expires: consts.EXPIRES_REFRESH_TOKEN_IN },
});

export const RefreshTokenModel = mongoose.model<RefreshTokenInterface>(
  'RefreshToken',
  RefreshTokenSchema,
);
