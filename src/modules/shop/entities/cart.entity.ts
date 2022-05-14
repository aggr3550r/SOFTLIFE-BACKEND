import { BaseModel } from 'src/models/base.model';
import { User } from 'src/modules/users/entities/user.entity';
import { CartItems } from 'src/types/cart-items.type';
import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends BaseModel {
  @ManyToOne(() => User, (user) => user.carts)
  owner: User;

  @OneToMany(() => CartItem, (cart_items) => cart_items.cart)
  cart_items: CartItems;
}
