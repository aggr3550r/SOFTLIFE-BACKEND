import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Cart } from '../entities/cart.entity';

@Injectable()
@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {}
