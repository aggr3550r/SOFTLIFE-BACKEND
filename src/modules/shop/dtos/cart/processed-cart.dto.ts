import { IsBoolean, IsNumber, IsUUID } from 'class-validator';

export class ProcessedCartDTO {
  @IsNumber()
  number_of_items_processed: number;

  @IsNumber()
  total_cost_of_cart: number;

  @IsUUID()
  cart_owner_id: number;

  @IsBoolean()
  is_resolved: boolean;
}
