import { Cart } from 'src/modules/shop/entities/cart.entity';
import { Product } from 'src/modules/shop/entities/product.entity';

export interface ICartInterface {
  createEmptyCart(): Cart;
  addItemToExistingCart(item: Product, cart_id: string): Cart;
  createCartAndAddItem(item: Product): Cart;
  removeItemFromCart(item: Product, cart_id: string): Cart;
}
