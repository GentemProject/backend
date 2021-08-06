import bcrypt from 'bcryptjs';
import validator from 'validator';
import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';

@pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (error) {
    return next(error);
  }
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @prop({
    required: true,
    index: true,
    unique: true,
  })
  public firebaseId: string;

  @prop({ required: true, index: true, trim: true })
  public name: string;

  @prop({
    required: true,
    index: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Email is not valid',
    },
  })
  public email: string;

  @prop({ required: true, trim: true })
  public password: string;

  @prop({ default: false })
  public isAdmin?: boolean;

  @prop({ default: Date.now })
  public lastLoginAt?: Date;
}

export const UserModel = getModelForClass(User);
