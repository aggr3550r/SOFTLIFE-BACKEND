import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/user.repository';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, UsersService],
})
export class PaymentProviderModule {}
