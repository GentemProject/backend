import { logger } from '../../utils';
import { getCauses } from '../causes';
import { OrganizationInterface } from './interface';

export const OrganizationsTypes = {
  Organization: {
    causes: async (organization: OrganizationInterface) => {
      try {
        return await getCauses({ causesIds: organization.causesIds });
      } catch (error) {
        logger.child(error).error('error getType type');
        return [];
      }
    },
  },
};
