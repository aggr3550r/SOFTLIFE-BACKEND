import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { DuplicateTransactionException } from 'src/exceptions/DuplicateTransactionException';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ResponseModel } from 'src/models/response.model';
import { PaystackProvider } from '../paymentprovider/paystack.provider';
import { User } from '../users/entities/user.entity';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { GeneratePaymentLinkDto } from './dtos/init-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private paymentLinkProcessor: PaystackProvider,
  ) {}

  @UseGuards(AuthGuard)
  @Post('payment_link')
  async paymentLink(
    @Body()
    initialize_transaction_dto: GeneratePaymentLinkDto,
    @CurrentUser() user: User,
  ): Promise<ResponseModel<CreateTransactionDTO>> {
    const transaction_already_exists =
      await this.transactionService.findByClientRef(
        initialize_transaction_dto.client_reference,
      );

    if (transaction_already_exists) {
      throw new DuplicateTransactionException();
    }

    initialize_transaction_dto.email = user.email;

    const transaction_payload =
      await this.paymentLinkProcessor.initializePaymentLinkTransaction(
        initialize_transaction_dto,
      );

    await this.transactionService.create(transaction_payload.data);

    return transaction_payload;
  }

  @UseGuards(AdminGuard)
  @Get('status')
  async status(
    @Query('reference') reference: string,
  ): Promise<Array<{ reference: string; status: PaymentStatus }>> {
    if (!reference)
      throw new UnprocessableEntityException(
        "Expected query param 'reference' missing.",
      );

    const references = reference.split(',');
    const status_report = await this.transactionService.fetchTransactionStatus(
      references,
    );

    return status_report;
  }
}
