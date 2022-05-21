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
  // @IsUUID()
  // id: string;

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
}
