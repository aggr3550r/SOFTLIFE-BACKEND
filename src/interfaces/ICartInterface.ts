// import { CreateCartDTO } from 'src/modules/shop/dtos/cart/create-cart.dto';
// import { ProcessedCartDTO } from 'src/modules/shop/dtos/cart/processed-cart.dto';
// import { Cart } from 'src/modules/shop/entities/cart.entity';
// import { Product } from 'src/modules/shop/entities/product.entity';
// import { User } from 'src/modules/users/entities/user.entity';

// export interface ICartInterface {
//   getACart(body: CreateCartDTO, user: User): Promise<Cart>;

//   addItemToExistingCart(
//     cart_item_id: string,
//     cart_id: string,
//     user: User,
//   ): Promise<Cart>;

//   createCartAndAddItem(cart_item_id: string): Promise<Cart>;

//   removeItemFromCart(cart_item_id: string, cart_id: string): Promise<Cart>;

//   emptyCart(cart_id: string): Promise<Cart>;

//   dropCart(cart_id: string): Promise<void>;

//   checkoutCart(cart_id: string): Promise<ProcessedCartDTO>;
// }
