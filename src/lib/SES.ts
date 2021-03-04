import { SES } from 'aws-sdk';
import { logger } from '../utils';

export async function sendEmail(options: { to: string; subject: string; message: string }) {
  try {
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

    const ses = new SES();

    return await ses.sendEmail(params).promise();
  } catch (error) {
    logger.child(error).error('Cannot send email');
    return false;
  }
}
