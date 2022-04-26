import { Logger, ValidationPipe, ValidationError, UnprocessableEntityException} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/rcp-exception.filter'
import { winstonLogger, WinstonLoggerService, winstonStream } from './utils/winston'; // should come first before the next line



async function bootstrap() {
  const port = process.env.PORT ? Number(process.env.PORT) : 8086;

  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLoggerService()
  }); 

  const httpRef = app.getHttpAdapter().getHttpServer();
  app.useGlobalFilters(new AllExceptionsFilter(httpRef, new Logger()));
  app.use(morgan('tiny', { stream: winstonStream }));

  app.useGlobalPipes(
    new ValidationPipe({
      validationError: {
        target: false
      },

      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new UnprocessableEntityException(errors);
      }
    })
  );

  await app.listen(port, () => console.log(`- App running on PORT ${port}`));

}
bootstrap();
