import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { winstonLogger } from 'src/utils/winston';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';
import { CartItemRepository } from '../repository/cart-item.repository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
  ) {}

  /* Conceptually, a cart_item is the offspring of a product whilst it is in a cart's womb.
   */
  async createCartItem(product: Product, cart: Cart): Promise<CartItem> {
    try {
      const cart_item = this.cartItemRepository.create(product);
      (cart_item.cart = cart),
        (cart_item.product = product),
        (cart_item.quantity_in_cart = 1),
        (cart_item.is_in_cart = true);
      return this.cartItemRepository.save(cart_item);
    } catch (error) {
      winstonLogger.error('createCartItem() error \n %s', error);
    }
  }

  async updateCartItem() {}

  async removeCartItem() {}
}
