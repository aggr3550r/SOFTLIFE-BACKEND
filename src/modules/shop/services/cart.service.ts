import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { winstonLogger } from 'src/utils/winston';
import { CreateCartDTO } from '../dtos/cart/create-cart.dto';
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

  async getACart(createCartDto: CreateCartDTO, user: User) {
    try {
      const id = user.id;
      const existing_cart = await this.findCartByOwnerId(id);

      if (existing_cart && !existing_cart.is_resolved) {
        return await this.cartRepository.findOne(existing_cart);
      } else {
        const cart = this.cartRepository.create(createCartDto);
        cart.owner = user;
        return await this.cartRepository.save(cart);
      }
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async addItemToCart(
    product_id: string,
    user: User,
    createCartDto?: CreateCartDTO,
  ) {
    try {
      const product = await this.productRepository.findOne(product_id);
      let cart = await this.findCartByOwnerId(user.id);

      if (!cart) {
        cart = await this.getACart(createCartDto, user);
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
      winstonLogger.error('error \n %s', error);
    }
  }

  async removeItemFromCart(product_id: string, user: User) {
    try {
      // go to the cart_item repository
      // find the cart_item with a product_id that matches the parameter passed
      const cart_item = await this.cartItemRepository.findOne({
        where: {
          product: product_id,
        },
      });
      // change the is_in_cart flag to false
      Object.assign(cart_item, { is_in_cart: false });
      // save the cart item back into its repository to persist the above updates
      await this.cartItemRepository.save(cart_item);
      // -------------------------------------------
      // perhaps repeat the above process for the corresponding cart_item record in the cart repository
      const cart = await this.findCartByOwnerId(user.id);
    } catch (error) {}
  }
  // async createCartAndAddItem(cart_item_id: string): Promise<Cart> {}

  // async removeItemFromCart(
  //   cart_item_id: string,
  //   cart_id: string,
  // ): Promise<Cart> {}

  // async emptyCart(cart_id: string): Promise<Cart> {}

  // async dropCart(cart_id: string): Promise<void> {}

  // async checkoutCart(cart_id: string): Promise<ProcessedCartDTO> {}

  async findCartByOwnerId(id: string) {
    if (!id) {
      return null;
    }
    const cart = await this.cartRepository.findOne({
      where: {
        owner: id,
      },
    });
    return cart;
  }
}
