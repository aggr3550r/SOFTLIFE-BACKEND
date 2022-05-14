import { BaseModel } from 'src/models/base.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column()
  quantity_in_stock: number;

  @Column({ default: false })
  is_in_stock: boolean;
}
