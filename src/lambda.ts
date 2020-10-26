import * as lambda from 'aws-lambda';
import awsServerlessExpress from 'aws-serverless-express';

import { init } from './app';
const server = awsServerlessExpress.createServer(init());

export const handler = (event: lambda.APIGatewayProxyEvent, context: lambda.Context) =>
  awsServerlessExpress.proxy(server, event, context);
