import { logger } from '../../utils';
import { causesQueries } from '../causes';
import { OrganizationInterface } from './interface';

export const OrganizationsTypes = {
  Organization: {
    causes: async (organization: OrganizationInterface) => {
      try {
        const causes = causesQueries.getCauses(null, {
          causesIds: organization.causesIds as string[],
        });

        return causes;
      } catch (error) {
        logger.child(error).error('error getType type');
        return [];
      }
    },
  },
};
