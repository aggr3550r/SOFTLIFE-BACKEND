import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCartItemDTO {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  quantity_in_stock: number;

  @IsBoolean()
  quantity_in_cart: number;

  @IsBoolean()
  is_in_cart: boolean;

  @IsBoolean()
  is_in_stock: boolean;
}
