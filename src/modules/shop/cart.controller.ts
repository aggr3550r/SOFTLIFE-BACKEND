import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { User } from '../users/entities/user.entity';
import { CartDTO } from './dtos/cart/cart-dto';
import { CreateCartDTO } from './dtos/cart/create-cart.dto';
import { CartService } from './services/cart.service';

@Controller('cart')
@Serialize(CartDTO)
export class CartController {
  constructor(private cartService: CartService) {}
  @Post('/create')
  async createCart(@Body() body: CreateCartDTO, @CurrentUser() user: User) {
    return await this.cartService.createEmptyCart(body, user);
  }
}
