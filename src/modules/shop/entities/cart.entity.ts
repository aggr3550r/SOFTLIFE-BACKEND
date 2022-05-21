import { BaseModel } from 'src/models/base.model';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart extends BaseModel {
  @Column({ default: true })
  is_in_use: boolean;

  @Column({ default: false })
  is_resolved: boolean;

  @ManyToOne(() => User, (user) => user.carts)
  owner: User;

  @OneToMany(() => CartItem, (cart_items) => cart_items.cart)
  cart_items: CartItem[];
}
