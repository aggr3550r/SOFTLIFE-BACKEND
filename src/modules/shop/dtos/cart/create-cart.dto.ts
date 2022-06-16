import { IsArray, IsBoolean, IsOptional } from 'class-validator';
import { CartItem } from '../../entities/cart-item.entity';

export class CreateCartDTO {
  @IsOptional()
  @IsBoolean()
  is_in_use?: boolean;

  @IsOptional()
  @IsBoolean()
  is_resolved?: boolean;

  @IsOptional()
  @IsArray()
  cart_items?: CartItem[];
}
