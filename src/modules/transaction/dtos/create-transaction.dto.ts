import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from 'class-validator';
import { PaymentChannels } from 'src/enums/payment.channels.enum';
import { PaymentProviders } from 'src/enums/payment.provider.enum';
import { PaymentStatus } from 'src/enums/payment.status.enum';

export class CreateTransactionDTO {
  @IsOptional()
  @IsUUID()
  initiator?: string;

  @IsNotEmpty()
  reference: string;

  @IsNotEmpty()
  client_reference: string;

  @IsNotEmpty()
  request: string;

  @IsNotEmpty()
  response: string;

  @IsEnum(PaymentStatus)
  @IsNotEmpty()
  status: PaymentStatus;

  @IsEnum(PaymentChannels)
  @IsNotEmpty()
  payment_mode: string;

  @IsNotEmpty()
  payment_link: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNotEmpty()
  currency: string;

  @IsOptional()
  client?: string;

  @IsEnum(PaymentProviders)
  @IsOptional()
  processor?: string;
}
