import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity()
export class CartItem extends Product {
  @Column()
  quantity_in_cart: number;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ default: false })
  is_in_cart: boolean;

  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cart_items)
  product: Product;
}
