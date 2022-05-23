import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Image } from 'src/types/image.type';

export class UpdateProductDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  product_image: Image;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  quantity_in_stock: number;

  @IsOptional()
  @IsBoolean()
  is_in_stock: boolean;
}
