import { CreateCartDTO } from 'src/modules/shop/dtos/cart/create-cart.dto';
import { User } from 'src/modules/users/entities/user.entity';

export interface ICartConfig {
  product_id?: string;
  create_cart_dto?: CreateCartDTO;
  user_id?: string;
}
