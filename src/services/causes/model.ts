import { getModelForClass, ModelOptions, pre, prop } from '@typegoose/typegoose';

import { slugify } from '../../utils';

@pre<Cause>('save', function (next) {
  console.log('RUNS SAVE');
  if (!this.isModified('name')) return next();
  this.slug = slugify(this.name);
  return next();
})
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Cause {
  @prop({ index: true, unique: true })
  public slug?: string;

  @prop({ required: true, index: true, unique: true, trim: true })
  public name: string;
}

export const CauseModel = getModelForClass(Cause);
