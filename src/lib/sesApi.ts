import { SES } from 'aws-sdk';
import { logger } from '../utils';

export class sesApi {
  ses: SES;

  constructor() {
    this.ses = new SES();
  }

  async sendEmail(options: { to: string; subject: string; message: string }) {
    try {
      logger.info('sesApi sendEmail request');
      const params = {
        Destination: {
          ToAddresses: [options.to],
        },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: options.subject,
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: options.message,
            },
          },
        },
        Source: 'Gentem Support Team <admin@gentem.org>',
      };
      await this.ses.sendEmail(params).promise();

      logger.info('sesApi sendEmail sended');
      return true;
    } catch (error) {
      logger.error(`sesApi sendEmail error: ${error.message}`);
      return false;
    }
  }
}
