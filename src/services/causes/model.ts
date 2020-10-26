import mongoose from 'mongoose';

import { CauseInterface } from '.';

const CauseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CauseModel = mongoose.model<CauseInterface>('Cause', CauseSchema);
