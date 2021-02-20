import { getModelForClass, ModelOptions, prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Cause {
  @prop({ required: true, index: true, unique: true, trim: true })
  public name: string;
}

export const CausesModel = getModelForClass(Cause);
