import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductRepository,
      User,
      UserRepository,
    ]),
  ],
  exports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ShopModule {}
