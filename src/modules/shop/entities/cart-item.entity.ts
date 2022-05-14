import { BaseModel } from 'src/models/base.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Cart } from './cart.entity';

@Entity()
export class CartItem extends BaseModel {
  @Column()
  quantity: number;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ default: false })
  is_in_cart: boolean;

  @ManyToOne(() => Cart, (cart) => cart.cart_items)
  cart: Cart;
}
