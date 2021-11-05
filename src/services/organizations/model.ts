import mongoose from 'mongoose';
import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';

import { slugify } from '../../utils';

@pre<primaryData>('save', function (next) {
  if (!this.isModified('name')) return next();
  try {
    this.slug = slugify(this.name);
    return next();
  } catch (error) {
    return next(error);
  }
})
class primaryData {
  @prop({ index: true })
  public slug?: string;

  @prop({ index: true, required: true, lowercase: true, trim: true })
  public name: string;

  @prop({ trim: true, lowercase: true, default: 'https://gentem.s3.amazonaws.com/default.jpg' })
  public logo?: string;

  @prop({ trim: true })
  public goal?: string;

  @prop({ trim: true })
  public description?: string;

  @prop({ trim: true })
  public useDonationsFor?: string;

  @prop({ index: true, type: () => [String] })
  public sponsors?: string[];

  @prop({ index: true, required: true, type: () => [mongoose.Types.ObjectId] })
  public causesId: mongoose.Types.ObjectId[];
}

class contact {
  @prop({ trim: true })
  public email?: string;

  @prop({ lowercase: true, trim: true })
  public phone?: string;

  @prop({ lowercase: true, trim: true })
  public website?: string;
}

class adminInfo {
  @prop({ trim: true })
  public adminFullName?: string;

  @prop({ lowercase: true, trim: true })
  public adminEmail?: string;
}

class socialMedia {
  @prop()
  public facebookUrl?: string;

  @prop()
  public instagramUrl?: string;

  @prop()
  public twitterUrl?: string;

  @prop()
  public whatsappUrl?: string;
}

class donationData {
  @prop({ type: () => [String] })
  public donationLinks?: string[];

  @prop()
  public donationsProducts?: string;

  @prop()
  public donationBankAccountName?: string;
}

class location {
  @prop()
  public city?: string;
  @prop()
  public country?: string;
  @prop()
  public coordenateX?: number;
  @prop()
  public coordenateY?: number;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Organization {
  @prop({ index: true })
  public ownerId?: mongoose.Types.ObjectId;

  @prop({ type: () => primaryData })
  public primaryData: primaryData;

  @prop({ type: () => contact })
  public contact: contact;

  @prop({ type: () => adminInfo })
  public adminInfo: adminInfo;

  @prop({ type: () => socialMedia })
  public socialMedia: socialMedia;

  @prop({ type: () => donationData })
  public donationData: donationData;

  @prop({ type: () => location })
  public location: location;
}

export const OrganizationModel = getModelForClass(Organization);
