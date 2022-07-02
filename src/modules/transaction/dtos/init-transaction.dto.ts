import { IsNotEmpty, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';

export class GeneratePaymentLinkDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  @IsUUID()
  initiator: string;

  @IsNotEmpty()
  currency: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  client_reference: string;

  @IsOptional()
  client?: string;
}
