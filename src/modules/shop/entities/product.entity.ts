import { BaseModel } from 'src/models/base.model';
import { Image } from 'src/types/image.type';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends BaseModel {
  @Column()
  name: string;

  @Column()
  product_image: Image;

  @Column()
  description: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column()
  quantity_in_stock: number;

  @Column({ default: false })
  is_in_stock: boolean;
}
