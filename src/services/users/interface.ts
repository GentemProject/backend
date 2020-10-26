import mongoose from 'mongoose';

export interface UserInterface extends mongoose.Document {
  isAdmin: boolean;
  name: string;
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}
