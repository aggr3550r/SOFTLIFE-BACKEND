import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import { ICartConfig } from 'src/interfaces/ICartConfig';
import { ResponseModel } from 'src/models/response.model';
import { UserRepository } from 'src/modules/users/repository/user.repository';
import { winstonLogger } from 'src/utils/winston';
import { FindManyOptions, getConnection } from 'typeorm';
import { CreateCartDTO } from '../dtos/cart/create-cart.dto';
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
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(CartItemRepository)
    private cartItemRepository: CartItemRepository,
    private cartItemService: CartItemService,
  ) {}

  /* ICartConfig is an interface that describes all the data that any function in this service will need to do its job.
  This design supports and is supported by high internal cohesiveness.
  */
  async getACart(config: ICartConfig): Promise<Cart> {
    try {
      const cart_exists = await this.findCartByOwnerId(config);
      const user = await this.userRepository.findOne(config.user_id);
      if (cart_exists) {
        return await this.cartRepository.findOne({ id: cart_exists.id });
      } else {
        const create_cart_dto: CreateCartDTO = {};
        const cart = this.cartRepository.create(create_cart_dto);
        cart.owner = user;
        return await this.cartRepository.save(cart);
      }
    } catch (error) {
      winstonLogger.error('getACart() error \n %s', error);
    }
  }

  async addItemToCart(config: ICartConfig): Promise<Cart> {
    try {
      const product = await this.productRepository.findOne(config.product_id);
      let cart =
        (await this.findCartByOwnerId(config)) ?? (await this.getACart(config));

      let cart_item = await this.findCartItemInCart(config);

      if (cart_item) {
        cart_item.quantity_in_cart++;
        this.cartItemRepository.save(cart_item);
      } else {
        cart_item = await this.cartItemService.createCartItem(product, cart);
      }

      return this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('addItemToCart() error \n %s', error);
    }
  }

  /**
   * Removes item from cart_item repository
   * @param
   * @returns A cart
   */
  async removeItemFromCart(config: ICartConfig): Promise<Cart> {
    try {
      const cart = await this.findCartByOwnerId(config);
      const cart_item = await this.findCartItemInCart(config);
      cart_item.is_in_cart = false;
      cart_item.quantity_in_cart = 0;
      return await (
        await this.saveCartAndCartItemInATransactionChain(cart, cart_item)
      ).data;
    } catch (error) {
      winstonLogger.error('removeItemFromCart() error \n %s', error);
    }
  }

  /**
   * Updates item quantity in cart_item repository
   * @param
   * @returns A cart
   */
  async updateCartItemQuantity(
    config: ICartConfig,
    new_quantity: number,
  ): Promise<Cart> {
    try {
      const cart = await this.findCartByOwnerId(config);
      const cart_item = await this.findCartItemInCart(config);

      Object.assign(cart_item, { quantity_in_cart: new_quantity });

      return await (
        await this.saveCartAndCartItemInATransactionChain(cart, cart_item)
      ).data;
    } catch (error) {
      winstonLogger.error('updateCartItemQuantity() error \n %s', error);
    }
  }

  async fetchAllCartItemsInCart(config: ICartConfig): Promise<CartItem[]> {
    try {
      const cart = await this.findCartByOwnerId(config),
        cart_id = cart.id;
      const where: FindManyOptions<CartItem>['where'] = {};
      where.cart = cart_id;
      where.is_in_cart = true;
      const cart_items = await this.cartItemRepository.find({ where });
      return cart_items;
    } catch (error) {
      winstonLogger.error('fetchAllCartItemsInCart() error \n %s', error);
    }
  }

  async emptyCart(config: ICartConfig): Promise<Cart> {
    try {
      /* Removes all cart_items from cart
       */
      const cart = await this.findCartByOwnerId(config),
        cart_id = cart.id;
      const where: FindManyOptions<CartItem>['where'] = {};
      where.cart = cart_id;
      where.is_in_cart = true;
      const cart_items = await this.cartItemRepository.find({
        where,
      });
      cart_items.forEach((cart_item) => {
        cart_item.is_in_cart = false;
      });
      await this.cartItemRepository.save(cart_items);
      return await this.cartRepository.save(cart);
    } catch (error) {
      winstonLogger.error('emptyCart() error \n %s', error);
    }
  }

  async dropCart(config: ICartConfig): Promise<void> {
    const cart = await this.findCartByOwnerId(config);
    await this.emptyCart(config);
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

  /** This method will serve to converge all the functionality necessary to pay for a cart, notify the purchasing customer and have it shipped.
   **
  For the sake of internal cohesion, it will remain in this service. However, its core implementation will be appropriately decoupled in adherence to the single responsibility principle 
   **/
  async checkoutCart() {}

  /**
   * This is the most crucial method in this service.
     It is leveraged by just about every other method in
     here to find the cart that is currently in procession
     for the user that is currently in session.
     I couldn't possibly overemphasize how much easier this makes my life.
    * @params config which is of type ICartConfig
    * @returns A cart that belongs to the user currently in session
   */
  async findCartByOwnerId(config: ICartConfig): Promise<Cart> {
    try {
      const where: FindManyOptions<Cart>['where'] = {};
      const owner_id = config.user_id;
      where.owner = owner_id;
      where.is_resolved = false;
      where.is_in_use = true;
      const cart = await this.cartRepository.findOne({ where });
      return cart;
    } catch (error) {
      winstonLogger.error(
        'Error while trying to find an unresolved cart for this user \n %s',
        error,
      );
    }
  }

  async findCartItemInCart(config: ICartConfig): Promise<CartItem> {
    try {
      const cart = await this.findCartByOwnerId(config);
      const product_id = config.product_id;
      const cart_id = cart.id;
      const where: FindManyOptions<CartItem>['where'] = {};
      where.product = product_id;
      where.cart = cart_id;
      where.is_in_cart = true;
      const cart_item = await this.cartItemRepository.findOne({ where });
      return cart_item;
    } catch (error) {
      winstonLogger.error(
        'Error while trying to find that cart item in this cart \n %s',
        error,
      );
    }
  }

  async saveCartAndCartItemInATransactionChain(
    cart: Cart,
    cart_item: CartItem,
  ) {
    try {
      await getConnection().transaction(async (manager) => {
        await manager.save(Cart, cart);

        await manager.save(CartItem, cart_item);
      });

      const updatedCart = await this.cartRepository.findOne({ id: cart.id });

      return new ResponseModel(
        SoftlifeResponseStatus.SUCCESS,
        'Successfully saved all entities in a transaction chain.',
        updatedCart,
      );
    } catch (error) {
      winstonLogger.error(
        'saveCartAndCartItemInATransactionChain() \n %o',
        error,
      );

      return new ResponseModel(
        SoftlifeResponseStatus.FAILED,
        'Unable to save all entities in a transaction chain, rolling back changes...',
        null,
      );
    }
  }
}
