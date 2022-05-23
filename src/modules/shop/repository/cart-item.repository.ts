import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from '../entities/cart-item.entity';

@Injectable()
@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {}
