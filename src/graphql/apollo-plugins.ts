import { ApolloServerExpressConfig } from 'apollo-server-express';
import { logger } from '../utils';

export const plugins: ApolloServerExpressConfig['plugins'] = [
  {
    requestDidStart() {
      const startRequestTime = Date.now();

      return {
        parsingDidStart({ request, source }) {
          if (request.operationName !== 'IntrospectionQuery') {
            logger.child({ request: source }).info('incoming request');
          }
        },
        didEncounterErrors({ errors }) {
          logger.child({ errors }).error('encounter errors');
        },
        willSendResponse({ request }) {
          const endRequestTime = Date.now();
          const responseTime = `${endRequestTime - startRequestTime} ms`;

          if (request.operationName !== 'IntrospectionQuery') {
            logger.child({ responseTime }).info('outcoming response');
          }
        },
      };
    },
  },
];
