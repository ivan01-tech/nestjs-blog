import errorMiddleware from 'src/middlewares/error.middleware';
import { ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

class AllExceptionFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    super.catch(exception, host);

    const req = host.switchToHttp().getRequest();
    const res = host.switchToHttp().getResponse();
    const next = host.switchToHttp().getNext();

    errorMiddleware(exception, req, res, next);
  }
}

export default AllExceptionFilter;
