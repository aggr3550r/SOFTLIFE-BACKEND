import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CurrentUserMiddleware } from '../../middlewares/current-user.middleware';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { PaymentProviderModule } from '../paymentprovider/paymentprovider.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    PaymentProviderModule,
  ],
  exports: [TypeOrmModule.forFeature([UserRepository]), UsersService],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
