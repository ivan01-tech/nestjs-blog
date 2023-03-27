import { NextFunction, Request, Response } from 'express';
import { v4 } from 'uuid';
import { join } from 'node:path';
import { mkdir, appendFile } from 'node:fs/promises';
import { format } from 'date-fns';
import { existsSync } from 'node:fs';

/**
 * a function to write some text in the specified filename
 * @param filename
 * @param message
 */
export const writeToFile = async (filename: string, message: string) => {
  const currentDir = join(process.cwd(), 'dist', 'logs');
  const date = format(new Date(), 'yyyy;MM;dd;hh;mm;ss');
  const finalMessage = `${date.toString()}\t${v4()}\t${message}\n`;

  try {
    //create the direction if it's not exist
    if (!existsSync(currentDir)) {
      await mkdir(currentDir);
    }

    console.log('message : ', finalMessage);

    await appendFile(join(currentDir, filename), finalMessage, {
      encoding: 'utf-8',
    });
  } catch (err) {
    console.log(err);
  }
};

/**
 * to register every request that the server receive
 * @param req
 * @param res
 * @param next
 */

const loggerMiddleware = async function (
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const {
    method,
    path,
    url,
    headers: { origin },
  } = req;

  const message = `${method}\t${path}\t${origin}\t${url}`;

  console.log(`Endpoint : ${method}/${path}`);

  await writeToFile('resquestLog.log', message);

  // call of the next function to excute the handler
  next();
};

export default loggerMiddleware;
