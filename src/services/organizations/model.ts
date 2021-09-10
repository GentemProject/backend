import mongoose from 'mongoose';
import { getModelForClass, ModelOptions, pre, prop, Severity } from '@typegoose/typegoose';

import { slugify } from '../../utils';
import { User } from '../users';
import { Cause } from '../causes';

@pre<Organization>('save', function (next) {
  if (!this.isModified('name')) return next();
  try {
    this.slug = slugify(this.name);
    return next();
  } catch (error) {
    return next(error);
  }
})
@ModelOptions({ schemaOptions: { timestamps: true }, options: { allowMixed: Severity.ALLOW } })
export class Organization {
  @prop({ index: true, default: [], type: () => [mongoose.Types.ObjectId], ref: () => User })
  public ownersId: mongoose.Types.ObjectId[];

  @prop({ index: true, default: [], type: () => [mongoose.Types.ObjectId], ref: () => Cause })
  public causesId: mongoose.Types.ObjectId[];

  @prop({ index: true, default: true })
  public isPublished?: boolean;

  @prop({ index: true, required: true, lowercase: true, trim: true })
  public name: string;

  @prop({ index: true, unique: true })
  public slug?: string;

  @prop({ trim: true, lowercase: true, default: 'https://gentem.s3.amazonaws.com/default.jpg' })
  public logo?: string;

  @prop({ trim: true, required: true })
  public goal: string;

  @prop({ trim: true })
  public description?: string;

  @prop({ trim: true })
  public useDonationsFor?: string;

  @prop({ lowercase: true, trim: true })
  public email?: string;

  @prop({ lowercase: true, trim: true })
  public phone?: string;

  @prop({ lowercase: true, trim: true })
  public website?: string;

  @prop({ trim: true })
  public adminFullName?: string;

  @prop({ lowercase: true, trim: true })
  public adminEmail?: string;

  @prop({ index: true, default: [] })
  public locations?: {
    address: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    coordenateX: number;
    coordenateY: number;
  }[];

  @prop({ default: [] })
  public socialMedia?: {
    key: string;
    name: string;
    url: string;
  }[];

  @prop({ default: [] })
  public donations?: {
    key: string;
    title: string;
    description: string;
  }[];

  @prop({ default: [] })
  public sponsors?: {
    name: string;
    img: string;
    link: string;
  }[];
}

export const OrganizationModel = getModelForClass(Organization);
