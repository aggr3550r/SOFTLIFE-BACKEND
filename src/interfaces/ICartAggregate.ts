import { CartItem } from 'src/modules/shop/entities/cart-item.entity';
import { Cart } from 'src/modules/shop/entities/cart.entity';
import { CartItems } from 'src/types/cart-items.type';

export interface ICartAggregate {
  cart: Cart;
  cart_items: CartItem[];
}
