import { getModelForClass, prop } from '@typegoose/typegoose';
import { consts } from '../../config';

class RefreshToken {
  @prop({ index: true, required: true, unique: true })
  public token: string;

  @prop({ default: Date.now, expires: consts.EXPIRES_REFRESH_TOKEN_IN })
  public createdAt?: Date;
}

export const RefreshTokenModel = getModelForClass(RefreshToken);
