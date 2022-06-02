import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftlifeResponseStatus } from 'src/enums/softife.response.enum';
import { ResponseModel } from 'src/models/response.model';
import { winstonLogger } from 'src/utils/winston';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { Product } from '../entities/product.entity';
import { CartItemRepository } from '../repository/cart-item.repository';
import { ProductRepository } from '../repository/product.repository';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
  ) {}

  /* Conceptually, a cart_item is an offspring of a product whilst it is in a cart's womb.
   */
  async createCartItem(product: Product, cart: Cart): Promise<CartItem> {
    try {
      const cart_item = this.cartItemRepository.create(product);
      (cart_item.cart = cart),
        (cart_item.quantity_in_cart = 1),
        (cart_item.is_in_cart = true);
      product.cart_items.push(cart_item);
      this.productRepository.save(product);
      return this.cartItemRepository.save(cart_item);
    } catch (error) {
      winstonLogger.error('Create_Cart_Item error \n %s', error);
    }
  }

  async updateCartItem() {}

  async removeCartItem() {}
}
