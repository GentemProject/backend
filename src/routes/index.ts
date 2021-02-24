import express, { Request, Response } from 'express';
import { connectDatabase } from '../middlewares';

const route = express.Router();
/*
 * GET test
 */
route.get('/health', async (_req: Request, res: Response) => {
  let database = false;
  const databaseSuccess = await connectDatabase();
  if (databaseSuccess) database = true;

  return res.status(200).json({
    data: {
      log: true,
      database,
    },
  });
});

export { route as healthApi };
