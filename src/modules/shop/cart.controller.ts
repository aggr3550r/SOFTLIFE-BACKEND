import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ICartConfig } from 'src/interfaces/ICartConfig';
import { User } from '../users/entities/user.entity';
import { UpdateCartItemDTO } from './dtos/cart-item/update-cart-item.dto';
import { CartDTO } from './dtos/cart/cart-dto';
import { CreateCartDTO } from './dtos/cart/create-cart.dto';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';

@Controller('cart')
@Serialize(CartDTO)
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('add-to-cart/:product_id')
  async addItemToCart(
    @CurrentUser() user: User,
    @Param('product') product_id: string,
    // @Query('create-cart') create_cart_dto?: CreateCartDTO,
  ): Promise<Cart> {
    let config: ICartConfig;
    console.log(user);
    config.user = user;
    // config.create_cart_dto = create_cart_dto;
    config.product_id = product_id;
    return await this.cartService.addItemToCart(config);
  }

  @Patch('remove-from-cart')
  async removeItemFromCart(
    @CurrentUser() user: User,
    @Query('product') product_id: string,
  ): Promise<Cart> {
    let config: ICartConfig;
    config.user = user;
    config.product_id = product_id;
    return await this.cartService.removeItemFromCart(config);
  }

  @Patch('update-quantity')
  async updateCartItemQuantity(
    @CurrentUser() user: User,
    @Query('update-item') update_cart_item_dto: UpdateCartItemDTO,
  ): Promise<Cart> {
    let new_quantity = update_cart_item_dto.quantity;
    let config: ICartConfig;
    config.user = user;
    config.product_id = update_cart_item_dto.product;
    return await this.cartService.updateCartItemQuantity(config, new_quantity);
  }

  @Get('fetch-cart-content')
  async fetchAllCartItemsInCart(
    @CurrentUser() user: User,
  ): Promise<CartItem[]> {
    let config: ICartConfig;
    config.user = user;
    return await this.cartService.fetchAllCartItemsInCart(config);
  }

  @Patch('empty-cart')
  async emptyCart(@CurrentUser() user: User): Promise<Cart> {
    let config: ICartConfig;
    config.user = user;
    return await this.cartService.emptyCart(config);
  }

  @Patch('drop-cart')
  async dropCart(@CurrentUser() user: User): Promise<void> {
    let config: ICartConfig;
    config.user = user;
    return await this.cartService.dropCart(config);
  }

  @Get('calculate-cost')
  async calculateCost(@CurrentUser() user: User): Promise<number> {
    let config: ICartConfig;
    config.user = user;
    return await this.cartService.calculateCostOfCart(config);
  }
}
