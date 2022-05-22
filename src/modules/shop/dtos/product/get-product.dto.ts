import { Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';
import { Image } from 'src/types/image.type';

export class GetProductDTO {
  @Expose()
  @IsUUID()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @MaxLength(300)
  description: string;

  @Expose()
  @IsOptional()
  product_images?: Image[];

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Expose()
  quantity_in_stock: number;
}
