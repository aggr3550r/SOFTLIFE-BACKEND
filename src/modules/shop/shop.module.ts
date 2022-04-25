import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SelectQueryBuilder } from 'typeorm';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import {Product } from './entities/product.entity'
import { Seller } from './entities/seller.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Product, Seller])],
  controllers: [ShopController],
  providers: [ShopService]
})
export class ShopModule {}
