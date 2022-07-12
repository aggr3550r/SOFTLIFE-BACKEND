import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { DuplicateTransactionException } from 'src/exceptions/DuplicateTransactionException';
import { ResponseModel } from 'src/models/response.model';
import { PaystackProvider } from '../paymentprovider/paystack.provider';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { GeneratePaymentLinkDto } from './dtos/init-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private paymentLinkProcessor: PaystackProvider,
  ) {}

  @Post('payment_link')
  async paymentLink(
    @Body()
    initialize_transaction_dto: GeneratePaymentLinkDto,
  ): Promise<ResponseModel<CreateTransactionDTO>> {
    const transaction_already_exists =
      await this.transactionService.findByClientRef(
        initialize_transaction_dto.client_reference,
      );

    if (transaction_already_exists) {
      throw new DuplicateTransactionException();
    }

    const transaction_payload =
      await this.paymentLinkProcessor.initializePaymentLinkTransaction(
        initialize_transaction_dto,
      );

    await this.transactionService.create(transaction_payload.data);

    return transaction_payload;
  }

  @Post('status')
  async status(
    @Query('reference') reference: string,
  ): Promise<Array<{ reference: string; status: PaymentStatus }>> {
    const references = reference.split(',');
    const status_report = await this.transactionService.fetchTransactionStatus(
      references,
    );

    return status_report;
  }
}
