import mongoose from 'mongoose';
import { logger } from '../../utils';

import { CauseModel } from '.';

export async function createCause(options: { name: string }) {
  try {
    logger.info('createCause controller');
    return await CauseModel.create({ name: options.name });
  } catch (error) {
    logger.child(error).error('error createCause controller');
    return null;
  }
}

export async function deleteCause(options: { causeId: string }) {
  try {
    logger.info('deleteCause controller');
    const cause = await CauseModel.findByIdAndDelete(options.causeId);
    if (!cause) {
      throw new Error('We can delete it.');
    }

    return true;
  } catch (error) {
    logger.child({ error: error.message }).error('error deleteCause controller');
    return false;
  }
}

export async function getCause(options: { causeId: string }) {
  try {
    logger.info('getCause controller');
    return await CauseModel.findById(options.causeId).exec();
  } catch (error) {
    logger.child(error).error('error getCause controller');
    return null;
  }
}

export async function getCauses(options: { causesIds?: mongoose.Types.ObjectId[] }) {
  try {
    let filter = {};

    if (options.causesIds) {
      filter = {
        ...filter,
        _id: {
          $in: options.causesIds,
        },
      };
    }

    logger.info('getCauses controller');
    return await CauseModel.find(filter).exec();
  } catch (error) {
    logger.child(error).error('error getCauses controller');
    return [];
  }
}
