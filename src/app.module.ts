import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BlogModule } from './blog/blog.module';
import { PostsModule } from './blog/posts.module';
import { ShopModule } from './shop/shop.module';
import { APP_PIPE } from '@nestjs/core';
import { ComingSoonModule } from './coming-soon/coming-soon.module';
import { MailController } from './mail.controller';
import { SendgridService } from './sendgrid.service';
import { ContactModule } from './contact/contact.module';
const cookieSession = require('cookie-session');



@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal : true,
    envFilePath: `.env.${process.env.NODE_ENV}`
  }),
  UsersModule, PostsModule, BlogModule, ShopModule,
  TypeOrmModule.forRoot(),
  ComingSoonModule,
  ContactModule],
  controllers: [AppController, MailController],
  providers: [AppService,
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      whitelist: true
    }),
  }, SendgridService]
})
export class AppModule {
  constructor(private configService: ConfigService){}
  configure(consumer: MiddlewareConsumer){
    consumer.apply(cookieSession({
      keys: [this.configService.get('COOKIE_KEY')]
    })).forRoutes('*');
  }
}
