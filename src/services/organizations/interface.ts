import mongoose from 'mongoose';

export interface OrganizationInterface extends mongoose.Document {
  slug?: string;
  name: string;

  causesIds: mongoose.Types.ObjectId[];

  goal: string;
  description: string;
  howItIsUsingDonations: string;

  logoUrl: string;
  wallUrl?: string;

  city?: string;
  state?: string;
  country?: string;
  address?: string;
  coordenateX?: number;
  coordenateY?: number;

  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;

  userId?: string;
  adminName?: string;
  adminEmail?: string;

  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  whatsappPhone?: string;

  donationLinks?: string[];
  donationBankAccountName?: string;
  donationBankAccountType?: string;
  donationBankAccountNumber?: string;

  createdAt?: string;
  updatedAt?: string;
}
