import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { winstonLogger } from 'src/utils/winston';
import { CreateCartDTO } from '../dtos/cart/create-cart.dto';
import { Cart } from '../entities/cart.entity';
import { CartRepository } from '../repository/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository) private cartRepository: CartRepository,
  ) {}

  async createEmptyCart(createCartDto: CreateCartDTO, user: User) {
    try {
      const cart = this.cartRepository.create(createCartDto);
      cart.owner = user;
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async findOne(id: string): Promise<Cart> {
    if (!id) {
      return null;
    }
    return await this.cartRepository.findOne(id);
  }

  async findByOwnerId(owner: User) {
    if (!owner) {
      return null;
    }
    const cart = await this.cartRepository.findOne({ owner });
    console.log(cart);
    return cart;
  }

  async createEmptyCartAndAddCartItem() {}
}
