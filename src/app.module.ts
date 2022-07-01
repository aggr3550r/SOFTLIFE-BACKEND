import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { BlogPostModule } from './modules/blogposts/blogpost.module';
import { ShopModule } from './modules/shop/shop.module';
import { APP_PIPE } from '@nestjs/core';
import { ComingSoonModule } from './modules/coming-soon/coming-soon.module';
import { MailController } from './mail.controller';
import { SendgridService } from './sendgrid.service';
import { ContactModule } from './modules/contact/contact.module';
import { HealthController } from './health/health.controller';
import { PaymentProviderModule } from './modules/paymentprovider/paymentprovider.module';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    UsersModule,
    BlogPostModule,
    ShopModule,
    PaymentProviderModule,
    HttpModule,
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    ComingSoonModule,
    ContactModule,
    TerminusModule,
  ],
  controllers: [AppController, MailController, HealthController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    SendgridService,
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [process.env.COOKIE_KEY],
        }),
      )
      .forRoutes('*');
  }
}
//this.configService.get('COOKIE_KEY')
