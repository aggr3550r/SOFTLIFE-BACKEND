import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDTO } from './create-transaction.dto';

export class UpdateTransactionDTO extends PartialType(CreateTransactionDTO) {}
