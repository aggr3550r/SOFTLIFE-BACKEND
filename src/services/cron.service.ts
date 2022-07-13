import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentChannels } from 'src/enums/payment.channels.enum';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { TransactionRepository } from 'src/modules/transaction/repository/transaction.repository';
import { PromisePool } from '@supercharge/promise-pool';
import { Transaction } from 'src/modules/transaction/entities/transaction.entity';
import RequestUtil from 'src/utils/request.util';
import { winstonLogger } from 'src/utils/winston';
import { PaystackRequeryResponse } from 'src/interfaces/payment-interfaces/IPaystackRequeryStatus';
import { AxiosResponse } from 'axios';

export class CronService {
  private readonly logger = new Logger(CronService.name);
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  paystack_base_url = process.env.PAYSTACK_BASE_URL;

  paystack_auth_header = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  createPaystackVerificationURL = (transaction_reference: string): string => {
    return this.paystack_base_url.concat(
      process.env.PAYSTACK_VERIFY_TRANSACTION_URL,
      `/${transaction_reference}`,
    );
  };

  /**
   * This cron handles the process of periodically verifying the status of transactions on paystack's end and then updating our records to match.
   */
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleTransactionStatusUpdateCron() {
    try {
      this.logger.log('running handleTransactionStatusUpdateCron...');

      const pending_transactions = await this.transactionRepository.find({
        status: PaymentStatus.PENDING,
        payment_mode: PaymentChannels.PAYMENT_LINK,
      });

      winstonLogger.info('pending transactions count:');
      winstonLogger.info(pending_transactions.length);

      const { results, errors } = await PromisePool.withConcurrency(20)
        .for(pending_transactions)
        .process(async (transaction: Transaction, index, pool) => {
          const transaction_response: AxiosResponse<
            PaystackRequeryResponse,
            null
          > = await RequestUtil.makeGetRequest(
            this.createPaystackVerificationURL(transaction.reference),
            this.paystack_auth_header,
          );

          if (transaction_response.data.data.status === 'success') {
            return transaction.reference;
          }

          winstonLogger.info('successful transactions count:');
          winstonLogger.info(results.length);

          if (results.length) {
            this.transactionRepository
              .createQueryBuilder('transaction')
              .update('transaction')
              .set({ status: PaymentStatus.SUCCESS })
              .where('reference IN :...refs', { refs: results })
              .execute();
          }

          if (errors.length) {
            winstonLogger.info(
              'Some error(s) have occured while verifying the status of pending transactions...',
            );
            winstonLogger.error(errors);
          }
        });
    } catch (error) {
      this.logger.log('Error from handleTransactionStatusUpdateCron...');
      this.logger.log(error.toString());
    }
  }
}
