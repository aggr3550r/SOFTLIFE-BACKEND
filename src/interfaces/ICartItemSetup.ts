import { User } from 'src/modules/users/entities/user.entity';

export interface ICartItemSetup {
  product_id?: string;
  cart_id?: string;
  user?: User;
}
