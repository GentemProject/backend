import mongoose from 'mongoose';

export interface CauseInterface extends mongoose.Document {
  name: string;
  createdAt?: string;
  updatedAt?: string;
}
