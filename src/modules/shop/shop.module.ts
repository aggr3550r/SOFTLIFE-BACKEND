import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repository/product.repository';
import { ProductController } from './product.controller';
import { ProductService } from './services/product.service';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/user.repository';
import { CartRepository } from './repository/cart.repository';
import { CartController } from './cart.controller';
import { CartService } from './services/cart.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { CartItemRepository } from './repository/cart-item.repository';
import { CartItemService } from './services/cart-item.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductRepository,
      User,
      UserRepository,
      Cart,
      CartRepository,
      CartItem,
      CartItemRepository,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      ProductRepository,
      CartRepository,
      CartItemRepository,
    ]),
  ],
  controllers: [ProductController, CartController],
  providers: [ProductService, CartService, CartItemService],
})
export class ShopModule {}
