import { BaseModel } from 'src/models/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class CartItem extends BaseModel {
  @Column()
  product_id: string;

  @Column()
  cart_id: string;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
