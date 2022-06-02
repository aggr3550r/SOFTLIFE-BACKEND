import { IsNumber, IsString } from 'class-validator';

export class UpdateCartItemDTO {
  @IsString()
  product: string;

  @IsNumber()
  quantity: number;
}
