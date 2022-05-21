import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { Image } from 'src/types/image.type';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(300)
  description: string;

  @IsOptional()
  product_images?: Image[];

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  quantity_in_stock?: number;
}
