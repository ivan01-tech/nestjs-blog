import { writeToFile } from './logger.middleware';
import { NextFunction, Request, Response } from 'express';

async function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const message = `${req.method}\t${req.path}\t${req.headers.origin}\t${error.message}`;

  await writeToFile('errorLog.log', message);

  console.log('message : ', error.stack);
}

export default errorMiddleware;
