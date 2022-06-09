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
import { ICartAggregate } from 'src/interfaces/ICartAggregate';
import { ICartConfig } from 'src/interfaces/ICartConfig';
import { User } from '../users/entities/user.entity';
import { UpdateCartItemDTO } from './dtos/cart-item/update-cart-item.dto';
import { CartDTO } from './dtos/cart/cart-dto';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { CartService } from './services/cart.service';

@Controller('cart')
// @Serialize(CartDTO)
@UseGuards(AuthGuard)
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('add-to-cart/:product_id')
  async addItemToCart(
    @CurrentUser() user: User,
    @Param('product_id') product_id: string,
  ): Promise<Cart> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    config.product_id = product_id;
    return await this.cartService.addItemToCart(config);
  }

  @Patch('remove-from-cart')
  async removeItemFromCart(
    @CurrentUser() user: User,
    @Query('product_id') product_id: string,
  ): Promise<Cart> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    config.product_id = product_id;
    return await this.cartService.removeItemFromCart(config);
  }

  @Patch('update-quantity')
  async updateCartItemQuantity(
    @CurrentUser() user: User,
    @Body() update_cart_item_dto: UpdateCartItemDTO,
  ): Promise<Cart> {
    const config: ICartConfig = {};
    const new_quantity = update_cart_item_dto.quantity;
    config.user_id = user.id;
    config.product_id = update_cart_item_dto.product;
    return await this.cartService.updateCartItemQuantity(config, new_quantity);
  }

  @Get('fetch-cart-content')
  async fetchAllCartItemsInCart(
    @CurrentUser() user: User,
  ): Promise<CartItem[]> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    return await this.cartService.fetchAllCartItemsInCart(config);
  }

  @Patch('empty-cart')
  async emptyCart(@CurrentUser() user: User): Promise<Cart> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    return await this.cartService.emptyCart(config);
  }

  @Patch('drop-cart')
  async dropCart(@CurrentUser() user: User): Promise<void> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    return await this.cartService.dropCart(config);
  }

  @Get('calculate-cost')
  async calculateCost(@CurrentUser() user: User): Promise<number> {
    const config: ICartConfig = {};
    config.user_id = user.id;
    return await this.cartService.calculateCostOfCart(config);
  }
}
