import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICartArgsSetup } from 'src/interfaces/ICartArgsSetup';
import { ResponseModel } from 'src/models/response.model';
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
    @InjectRepository(CartItem) private cartItemRepository: CartItemRepository,
    private cartItemService: CartItemService,
  ) {}

  async getACart(args: ICartArgsSetup): Promise<Cart> {
    try {
      const existing_cart = await this.findCartByOwnerId(args);

      if (existing_cart && !existing_cart.is_resolved) {
        return await this.cartRepository.findOne(existing_cart);
      } else {
        const cart = this.cartRepository.create(args.create_cart_dto);
        cart.owner = args.user;
        return await this.cartRepository.save(cart);
      }
    } catch (error) {
      winstonLogger.error('getACart() error \n %s', error);
    }
  }

  async addItemToCart(args: ICartArgsSetup): Promise<Cart> {
    try {
      const product = await this.productRepository.findOne(args.product_id);
      let cart = await this.findCartByOwnerId(args);

      if (!cart) {
        cart = await this.getACart(args);
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

  async removeItemFromCart(args: ICartArgsSetup): Promise<Cart> {
    try {
      /* Removes item from cart_item repository
       */
      const cart = await this.findCartByOwnerId(args);
      const product_id = args.product_id;
      const cart_id = cart.id;
      const original_cart_item = await this.cartItemRepository.findOne({
        where: {
          cart: cart_id,
          product: product_id,
        },
      });

      Object.assign(original_cart_item, { is_in_cart: false });
      await this.cartItemRepository.save(original_cart_item);

      // --------------------------------------------------

      /* Removes item from cart repository
       */
      const backup_cart_item = cart.cart_items.find((obj) => {
        obj.id === original_cart_item.id;
      });

      Object.assign(backup_cart_item, { is_in_cart: false });
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('removeItemFromCart() error \n %s', error);
    }
  }

  async updateCartItemQuantity(
    args: ICartArgsSetup,
    new_quantity: number,
  ): Promise<Cart> {
    try {
      /* Updates item_quantity in cart_item repository
       */
      const cart = await this.findCartByOwnerId(args);
      const product_id = args.product_id;
      const cart_id = cart.id;
      const original_cart_item = await this.cartItemRepository.findOne({
        where: {
          cart: cart_id,
          product: product_id,
        },
      });

      Object.assign(original_cart_item, { quantity: new_quantity });
      await this.cartItemRepository.save(original_cart_item);

      // ---------------------------------------------------

      /* Updates item_quantity in cart repository
       */
      const backup_cart_item = cart.cart_items.find((obj) => {
        obj.id === original_cart_item.id;
      });

      Object.assign(backup_cart_item, { quantity: new_quantity });
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('updateCartItemQuantity() error \n %s', error);
    }
  }

  async fetchAllCartItemsInCart(args: ICartArgsSetup): Promise<CartItem[]> {
    try {
      const cart = await this.findCartByOwnerId(args),
        cart_id = cart.id;
      const cart_items = await this.cartItemRepository.find({
        where: {
          cart: cart_id,
        },
      });
      return cart_items;
    } catch (error) {
      winstonLogger.error('fetchAllCartItemsInCart() error \n %s', error);
    }
  }

  async emptyCart(args: ICartArgsSetup): Promise<Cart> {
    try {
      /* Removes original cart_items from cart_item_repository
       */
      const cart = await this.findCartByOwnerId(args),
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
      winstonLogger.error('error \n %s', error);
    }
  }

  async dropCart(args: ICartArgsSetup): Promise<void> {
    const cart = await this.findCartByOwnerId(args);
    cart.is_in_use = false;
    await this.cartRepository.save(cart);
    return null;
  }

  async calculateCostOfCart(args: ICartArgsSetup) {
    try {
      const cart_items = await this.fetchAllCartItemsInCart(args);
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

  async findCartByOwnerId(args: ICartArgsSetup): Promise<Cart> {
    try {
      const owner_id = args.user.id;
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

      if (!cart) {
        throw new NotFoundException('No unresolved cart found for this user');
      }
      return cart;
    } catch (error) {
      winstonLogger.error(
        'Error while trying to find unresolved cart \n %s',
        error,
      );
    }
  }
}
