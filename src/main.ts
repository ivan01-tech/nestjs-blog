import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import errorMiddleware from 'src/middlewares/error.middleware';
import loggerMiddleware from 'src/middlewares/logger.middleware';
import AllExceptionFilter from 'src/utils/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // append the logger middleware
  app.use(loggerMiddleware);

  // append the error middleware
  // TODO delete one here
  app.use(errorMiddleware);

  // register the error logger glabally
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen(3500);
}
bootstrap();
