import mongoose from 'mongoose';

export interface JwtToken {
  userId: string;
  isAdmin: boolean;
}

export interface RefreshTokenInterface extends mongoose.Document {
  token: string;
  createdAt?: string;
}
