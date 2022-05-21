import { BaseModel } from 'src/models/base.model';
import { Image } from 'src/types/image.type';
import { Column, Entity, OneToMany } from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity()
export class Product extends BaseModel {
  @Column()
  name: string;

  @Column({ nullable: true })
  product_image: Image;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  discount: number;

  @Column()
  quantity_in_stock: number;

  @Column({ default: false })
  is_in_stock: boolean;

  @OneToMany(() => CartItem, (cart_items) => cart_items.product)
  cart_items: CartItem[];
}
