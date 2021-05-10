import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slugify = require('slugify-mongoose');

import { OrganizationInterface } from '.';

const OrganizationSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      slug: 'name',
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    causesIds: {
      type: [mongoose.Types.ObjectId],
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    howItIsUsingDonations: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: true,
      default: '',
    },
    wallUrl: {
      type: String,
    },
    city: {
      type: String,
      index: true,
    },
    state: {
      type: String,
      index: true,
    },
    country: {
      type: String,
      index: true,
    },
    address: {
      type: String,
    },
    coordenateX: {
      type: Number,
    },
    coordenateY: {
      type: Number,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    contactWebsite: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    adminName: {
      type: String,
    },
    adminEmail: {
      type: String,
    },
    facebookUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    whatsappPhone: {
      type: String,
    },
    donationLinks: {
      type: [String],
    },
    donationProducts: {
      type: String,
    },
    donationBankAccountName: {
      type: String,
    },
    donationBankAccountType: {
      type: String,
    },
    donationBankAccountNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

OrganizationSchema.plugin(slugify);

export const OrganizationModel = mongoose.model<OrganizationInterface>(
  'Organization',
  OrganizationSchema,
);
