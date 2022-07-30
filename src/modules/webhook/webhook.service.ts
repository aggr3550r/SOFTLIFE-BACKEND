import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import IChargeResponse from 'src/interfaces/payment-interfaces/IChargeResponse';
import { PaystackWebhookResponseModel } from 'src/models/paystack-response.model';
import { ResponseModel } from 'src/models/response.model';
import { winstonLogger } from 'src/utils/winston';
import { Transaction } from '../transaction/entities/transaction.entity';
import { TransactionRepository } from '../transaction/repository/transaction.repository';

@Injectable()
export class WebhookService {
  @InjectRepository(TransactionRepository)
  private transactionRepository: TransactionRepository;

  async chargeSuccessHandler(
    charge_response: PaystackWebhookResponseModel<IChargeResponse>,
  ) {
    let transaction: Transaction;
    try {
      transaction = await this.transactionRepository.findOne({
        reference: charge_response.data.reference,
      });

      if (transaction) {
        transaction.response = JSON.stringify(charge_response);
        transaction.status =
          charge_response.data.status == 'success'
            ? PaymentStatus.SUCCESS
            : PaymentStatus.FAILED;
        this.transactionRepository.save(transaction);
      } else {
        return new ResponseModel(
          SoftlifeResponseStatus.NOT_FOUND,
          'Transaction not found!',
          null,
        );
      }
    } catch (error) {
      winstonLogger.info('chargeSuccessHandler() error');
      winstonLogger.error(error);
    }
  }
}
