import {
  Logger,
  ValidationPipe,
  ValidationError,
  UnprocessableEntityException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/rcp-exception.filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { WinstonLoggerService, winstonStream } from './utils/winston'; // should come first before the next line

async function bootstrap() {
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 8086;

  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService(),
  });

  const httpRef = app.getHttpAdapter().getHttpServer();
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, new Logger()));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(morgan('tiny', { stream: winstonStream }));

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false,
      },

      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      },
    }),
  );

  await app.listen(port, () => console.log(`- App running on PORT ${port}`));
}
bootstrap();

// import 'dotenv/config';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(Number(process.env.APP_PORT));
// }
// bootstrap();
