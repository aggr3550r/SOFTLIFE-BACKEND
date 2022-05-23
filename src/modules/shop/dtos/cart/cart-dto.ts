import { Expose, Transform } from 'class-transformer';
import { CartItem } from '../../entities/cart-item.entity';

export class CartDTO {
  @Expose()
  id: string;

  @Expose()
  is_in_use: boolean;

  @Expose()
  is_resolved: boolean;

  @Expose()
  cart_items: CartItem[];

  @Transform(({ obj }) => obj.owner.id)
  @Expose()
  owner_id: string;
}
