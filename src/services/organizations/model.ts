import mongoose from 'mongoose';
import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';
import { slugify } from '../../utils';

@pre<Organization>('save', function (next) {
  if (!this.isModified('name')) return next();
  try {
    if (this.primaryData) {
      this.primaryData.slug = slugify(this.primaryData?.name);
    }
    return next();
  } catch (error) {
    return next(error);
  }
})
@ModelOptions({ schemaOptions: { timestamps: true } })
class primaryData {
  @prop({ trim: true, lowercase: true, default: 'https://gentem.s3.amazonaws.com/default.jpg' })
  public logo?: string;

  @prop({ trim: true })
  public goal?: string;

  @prop({ trim: true })
  public useDonationsFor?: string;

  @prop({ index: true, type: () => [String] })
  public sponsors?: string[];

  @prop({ index: true, required: true, type: () => [mongoose.Types.ObjectId] })
  public causesId: mongoose.Types.ObjectId[];

  @prop({ trim: true })
  public description?: string;

  @prop({ index: true, required: true, lowercase: true, trim: true })
  public name: string;

  @prop({ index: true, unique: true })
  public slug?: string;
}
@ModelOptions({ schemaOptions: { timestamps: true } })
class contact {
  @prop({ trim: true })
  public email?: string;

  @prop({ lowercase: true, trim: true })
  public phone?: string;

  @prop({ lowercase: true, trim: true })
  public website?: string;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
class adminInfo {
  @prop({ trim: true })
  public adminFullName?: string;

  @prop({ lowercase: true, trim: true })
  public adminEmail?: string;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
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

@ModelOptions({ schemaOptions: { timestamps: true } })
class donationData {
  @prop({ type: () => [String] })
  public donationLinks?: string[];

  @prop()
  public donationsProducts?: string;

  @prop()
  public donationBankAccountName?: string;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
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

export class Organization {
  @prop({ index: true })
  public ownerId?: mongoose.Types.ObjectId;

  @prop()
  public primaryData?: primaryData;

  @prop()
  public contact?: contact;

  @prop()
  public adminInfo?: adminInfo;

  @prop()
  public socialMedia?: socialMedia;

  @prop()
  public donationData?: donationData;

  @prop()
  public location?: location;
}

export const OrganizationModel = getModelForClass(Organization);
