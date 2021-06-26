import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';

import { slugify } from '../../utils';

@pre<Cause>('save', function (next) {
  if (!this.isModified('name')) return next();
  try {
    this.slug = slugify(this.name);
    return next();
  } catch (error) {
    return next(error);
  }
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Cause {
  @prop({ index: true, unique: true })
  public slug?: string;

  @prop({ required: true, index: true, unique: true, trim: true })
  public name: string;
}

export const CauseModel = getModelForClass(Cause);
