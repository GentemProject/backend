import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

import { UserInterface } from './interface';

const UserSchema = new mongoose.Schema(
  {
    isAdmin: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(value: string) {
          return validator.isEmail(value);
        },
        message: 'Email is invalid',
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<UserInterface>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
});

export const UserModel = mongoose.model<UserInterface>('User', UserSchema);
