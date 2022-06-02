import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICartConfig } from 'src/interfaces/ICartConfig';
import { winstonLogger } from 'src/utils/winston';
import { ProcessedCartDTO } from '../dtos/cart/processed-cart.dto';
import { CartItem } from '../entities/cart-item.entity';
import { Cart } from '../entities/cart.entity';
import { CartItemRepository } from '../repository/cart-item.repository';
import { CartRepository } from '../repository/cart.repository';
import { ProductRepository } from '../repository/product.repository';
import { CartItemService } from './cart-item.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartRepository) private cartRepository: CartRepository,
    @InjectRepository(ProductRepository)
    private productRepository: ProductRepository,
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
    private cartItemService: CartItemService,
  ) {}

  /* ICartConfig is an interface that describes all the data that any function in this service will need to do its job.
  This design supports and is supported by high internal cohesiveness.
  */
  async getACart(config: ICartConfig): Promise<Cart> {
    try {
      const existing_cart = await this.findCartByOwnerId(config);

      if (existing_cart && !existing_cart.is_resolved) {
        return await this.cartRepository.findOne(existing_cart);
      } else {
        const cart = this.cartRepository.create(config.create_cart_dto);
        cart.owner = config.user;
        return await this.cartRepository.save(cart);
      }
    } catch (error) {
      winstonLogger.error('getACart() error \n %s', error);
    }
  }

  async addItemToCart(config: ICartConfig): Promise<Cart> {
    try {
      const product = await this.productRepository.findOne(config.product_id);
      let cart = await this.findCartByOwnerId(config);

      if (!cart) {
        cart = await this.getACart(config);
      }
      if (!cart.is_resolved) {
        let cart_item = await this.cartItemService.createCartItem(
          product,
          cart,
        );
        cart.cart_items.push(cart_item);
      }
      return this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('addItemToCart() error \n %s', error);
    }
  }

  async removeItemFromCart(config: ICartConfig): Promise<Cart> {
    try {
      /* Removes item from cart_item repository
       */
      const cart = await this.findCartByOwnerId(config);
      const product_id = config.product_id;
      const cart_id = cart.id;
      const original_cart_item = await this.cartItemRepository.findOne({
        where: {
          cart: cart_id,
          product: product_id,
        },
      });

      original_cart_item.is_in_cart = false;
      await this.cartItemRepository.save(original_cart_item);

      // --------------------------------------------------

      /* Removes item from cart repository
       */
      const backup_cart_item = cart.cart_items.find((obj) => {
        obj.id === original_cart_item.id;
      });

      backup_cart_item.is_in_cart = false;
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('removeItemFromCart() error \n %s', error);
    }
  }

  async updateCartItemQuantity(
    config: ICartConfig,
    new_quantity: number,
  ): Promise<Cart> {
    try {
      /* Updates item_quantity in cart_item repository
       */
      const cart = await this.findCartByOwnerId(config);
      const product_id = config.product_id;
      const cart_id = cart.id;
      const original_cart_item = await this.cartItemRepository.findOne({
        where: {
          cart: cart_id,
          product: product_id,
        },
      });

      Object.assign(original_cart_item, { quantity_in_cart: new_quantity });
      await this.cartItemRepository.save(original_cart_item);

      // ---------------------------------------------------

      /* Updates item_quantity in cart repository
       */
      const backup_cart_item = cart.cart_items.find((obj) => {
        obj.id === original_cart_item.id;
      });

      Object.assign(backup_cart_item, { quantity_in_cart: new_quantity });
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('updateCartItemQuantity() error \n %s', error);
    }
  }

  async fetchAllCartItemsInCart(config: ICartConfig): Promise<CartItem[]> {
    try {
      const cart = await this.findCartByOwnerId(config),
        cart_id = cart.id;
      const cart_items = await this.cartItemRepository.find({
        where: {
          cart: cart_id,
          is_in_cart: true,
        },
      });
      return cart_items;
    } catch (error) {
      winstonLogger.error('fetchAllCartItemsInCart() error \n %s', error);
    }
  }

  async emptyCart(config: ICartConfig): Promise<Cart> {
    try {
      /* Removes original cart_items from cart_item_repository
       */
      const cart = await this.findCartByOwnerId(config),
        cart_id = cart.id;
      const original_cart_items = await this.cartItemRepository.find({
        where: {
          cart: cart_id,
        },
      });
      original_cart_items.forEach((cart_item) => {
        cart_item.is_in_cart = false;
      });
      await this.cartItemRepository.save(original_cart_items);

      // ---------------------------------------------------

      /* Removes backup cart_items from cart_repository
       */
      const backup_cart_items = cart.cart_items;
      backup_cart_items.forEach((cart_item) => {
        cart_item.is_in_cart = false;
      });
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('emptyCart() error \n %s', error);
    }
  }

  async dropCart(config: ICartConfig): Promise<void> {
    const cart = await this.findCartByOwnerId(config);
    cart.is_in_use = false;
    await this.cartRepository.save(cart);
    return null;
  }

  async calculateCostOfCart(config: ICartConfig): Promise<number> {
    try {
      const cart_items = await this.fetchAllCartItemsInCart(config);
      let total_cost = 0.0;
      cart_items.forEach((item) => {
        const item_price = item.price,
          item_discount = item.discount / 100,
          item_quantity = item.quantity_in_cart;
        const price_per_item = item_price - item_price * item_discount;
        const gross = item_quantity * price_per_item;
        total_cost += gross;
      });
      return total_cost;
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async findCartByOwnerId(config: ICartConfig): Promise<Cart> {
    try {
      const owner_id = config.user.id;
      if (!owner_id) {
        return null;
      }
      const cart = await this.cartRepository.findOne({
        where: {
          owner: owner_id,
          is_resolved: false,
          is_in_use: true,
        },
      });
      return cart;
    } catch (error) {
      winstonLogger.error(
        'Error while trying to find unresolved cart for this user \n %s',
        error,
      );
    }
  }
}
