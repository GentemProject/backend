import mongoose from 'mongoose';
import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';

import { slugify } from '../../utils';

@pre<Organization>('save', function (next) {
  if (!this.isModified('name')) return next();
  try {
    this.slug = slugify(this.name);
    return next();
  } catch (error) {
    return next(error);
  }
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Organization {
  @prop({ index: true })
  public ownerId?: mongoose.Types.ObjectId;

  @prop({ index: true, required: true, type: () => [mongoose.Types.ObjectId] })
  public causesId: mongoose.Types.ObjectId[];

  @prop({ index: true, unique: true })
  public slug?: string;

  @prop({ trim: true, lowercase: true, default: 'https://gentem.s3.amazonaws.com/default.jpg' })
  public logo?: string;

  @prop({ index: true, required: true, lowercase: true, trim: true })
  public name: string;

  @prop({ trim: true })
  public goal?: string;

  @prop({ trim: true })
  public description?: string;

  @prop({ trim: true })
  public useDonationsFor?: string;

  @prop({ trim: true })
  public email?: string;

  @prop({ lowercase: true, trim: true })
  public phone?: string;

  @prop({ lowercase: true, trim: true })
  public website?: string;

  @prop({ trim: true })
  public adminFullName?: string;

  @prop({ lowercase: true, trim: true })
  public adminEmail?: string;

  // TODO: improve this code
  @prop({ index: true, type: () => [String] })
  public addresses?: string[];
  @prop({ index: true, type: () => [String] })
  public cities?: string[];
  @prop({ index: true, type: () => [String] })
  public states?: string[];
  @prop({ index: true, type: () => [String] })
  public countries?: string[];
  @prop({ type: () => [Number] })
  public coordenateX?: number[];
  @prop({ type: () => [Number] })
  public coordenateY?: number[];
  // finish

  @prop()
  public facebookUrl?: string;

  @prop()
  public instagramUrl?: string;

  @prop()
  public twitterUrl?: string;

  @prop()
  public whatsappUrl?: string;

  @prop({ type: () => [String] })
  public donationLinks?: string[];

  @prop()
  public donationsProducts?: string;

  @prop()
  public donationBankAccountName?: string;

  @prop()
  public donationBankAccountType?: string;

  @prop()
  public donationBankAccountNumber?: string;
}

export const OrganizationModel = getModelForClass(Organization);
