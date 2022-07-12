import { forwardRef, Inject, Injectable } from '@nestjs/common';
import AbstractPaymentProvider from 'src/Abstract-Payment-Provider';
import { PaymentChannels } from 'src/enums/payment.channels.enum';
import { PaymentProviders } from 'src/enums/payment.provider.enum';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { PaystackTransactionStatus } from 'src/enums/paystack/paystack.transaction.status';
import { RequeryStatus } from 'src/enums/requery.status.enum';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import ICustomerInfo from 'src/interfaces/payment-interfaces/ICustomerInfo';
import { PaystackRequeryResponse } from 'src/interfaces/payment-interfaces/IPaystackRequeryStatus';
import { ISoftlifeRequeryResponse } from 'src/interfaces/payment-interfaces/ISoftlifeRequeryResponse';
import { ResponseModel } from 'src/models/response.model';
import RequestUtil from 'src/utils/request.util';
import { winstonLogger } from 'src/utils/winston';
import { CreateTransactionDTO } from '../transaction/dtos/create-transaction.dto';
import { GeneratePaymentLinkDto } from '../transaction/dtos/init-transaction.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaystackProvider extends AbstractPaymentProvider {
  paystackBaseUrl = process.env.PAYSTACK_BASE_URL;

  paystackAuthHeader = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  @Inject(forwardRef(() => UsersService))
  private readonly userService: UsersService;

  constructor() {
    super();
  }

  async initializePaymentLinkTransaction(
    generate_payment_link_dto: GeneratePaymentLinkDto,
  ): Promise<ResponseModel<CreateTransactionDTO>> {
    try {
      if (!this.isSupportedCurrency(generate_payment_link_dto.currency)) {
        return new ResponseModel(
          SoftlifeResponseStatus.FAILED,
          'Unsupported currency!',
          null,
        );
      }

      const customer_information: ICustomerInfo = {
        email: generate_payment_link_dto.email,
        amount: this.convertNairaToKobo(generate_payment_link_dto.amount),
        reference: this.generateTransactionReference(),
        currency: generate_payment_link_dto.currency,
        channels: this.channelList(),
      };

      const payment_link_generation_endpoint = this.paystackBaseUrl.concat(
        process.env.PAYSTACK_INITIALIZE_TRANSACTION_URL,
      );

      winstonLogger.info(
        'Payment Link Transaction Endpoint: %s',
        payment_link_generation_endpoint,
      );

      const paystack_response = await RequestUtil.makePostRequest(
        payment_link_generation_endpoint,
        customer_information,
        this.paystackAuthHeader,
      );

      const transaction_data: CreateTransactionDTO = {
        initiator: (await this.getInitiator(generate_payment_link_dto.email))
          .id,
        reference: customer_information.reference,
        client_reference: generate_payment_link_dto.client_reference,
        request: JSON.stringify(generate_payment_link_dto),
        response: JSON.stringify(paystack_response.data),
        status: PaymentStatus.PENDING,
        payment_mode: PaymentChannels.PAYMENT_LINK,
        payment_link: paystack_response.data.data.authorization_url,
        amount: customer_information.amount,
        currency: customer_information.currency,
        client: generate_payment_link_dto?.client,
        processor: PaymentProviders.PAYSTACK,
      };

      winstonLogger.info('Transaction: \n %o', transaction_data);

      return new ResponseModel(
        SoftlifeResponseStatus.SUCCESS,
        'Operation Successful!',
        transaction_data,
      );
    } catch (error) {
      winstonLogger.error('initiatePaymentLink() \n %o', error);

      return new ResponseModel(
        SoftlifeResponseStatus.FAILED,
        'Operation Failed!',
        null,
      );
    }
  }
  async requeryPaymentTransaction(
    reference: string,
  ): Promise<ResponseModel<ISoftlifeRequeryResponse>> {
    try {
      const requery_transaction_endpoint = this.paystackBaseUrl
        .concat(process.env.PAYSTACK_VERIFY_TRANSACTION_URL)
        .concat(`${reference}`);

      const transaction_status_response: PaystackRequeryResponse = (
        await RequestUtil.makeGetRequest(
          requery_transaction_endpoint,
          this.paystackAuthHeader,
        )
      ).data;

      winstonLogger.info(
        'Transaction status response: \n %o',
        transaction_status_response,
      );

      if (!transaction_status_response.status) {
        return new ResponseModel(
          SoftlifeResponseStatus.SUCCESS,
          'status retrieved successfully',
          {
            reference,
            status: RequeryStatus.ERROR,
            provider_response: transaction_status_response,
          },
        );
      }

      switch (transaction_status_response.data.status) {
        case PaystackTransactionStatus.SUCCESS:
          return new ResponseModel(
            SoftlifeResponseStatus.SUCCESS,
            "The status of the referenced transaction is 'SUCCESS'",
            {
              reference: reference,
              status: RequeryStatus.SUCCESS,
              provider_response: transaction_status_response,
            },
          );
          break;

        case PaystackTransactionStatus.FAILED:
          return new ResponseModel(
            SoftlifeResponseStatus.SUCCESS,
            "The status of the referenced transaction is 'FAILED'",
            {
              reference: reference,
              status: RequeryStatus.FAILED,
              provider_response: transaction_status_response,
            },
          );
          break;

        case PaystackTransactionStatus.PENDING:
          return new ResponseModel(
            SoftlifeResponseStatus.SUCCESS,
            "The status of the referenced transaction is 'PENDING'",
            {
              reference: reference,
              status: RequeryStatus.PENDING,
              provider_response: transaction_status_response,
            },
          );
          break;

        case PaystackTransactionStatus.REVERSED:
          return new ResponseModel(
            SoftlifeResponseStatus.SUCCESS,
            "The status of the referenced transaction is 'REVERSED'",
            {
              reference: reference,
              status: RequeryStatus.REVERSED,
              provider_response: transaction_status_response,
            },
          );
          break;

        default:
          return new ResponseModel(
            SoftlifeResponseStatus.SUCCESS,
            'The status of the referenced transaction is unknown. \n This can be due to a new status introduced by the provider or a missing status mapping internally.',
            {
              reference: reference,
              status: RequeryStatus.UNKNOWN,
              provider_response: transaction_status_response,
            },
          );
          break;
      }
    } catch (error) {
      winstonLogger.error('requeryPaymentTransaction() error', error);

      if (
        error.response?.data?.status == false &&
        error.response?.data?.message == `/\s/ not found`
      ) {
        return new ResponseModel(
          SoftlifeResponseStatus.SUCCESS,
          "Transaction not found on Paystack's end",
          {
            reference: reference,
            status: RequeryStatus.TRANSACTION_NOT_FOUND_FROM_PROVIDER,
            provider_response: error,
          },
        );
      }

      return new ResponseModel(
        SoftlifeResponseStatus.FAILED,
        'Unable to retrieve transaction status',
        {
          reference: reference,
          status: RequeryStatus.ERROR,
          provider_response: error,
        },
      );
    }
  }

  async fetchTransaction() {}

  protected getRefPrefix(): string {
    return 'PYSTK';
  }

  protected async getInitiator(email: string): Promise<User> {
    return await this.userService.findByEmail(email);
  }
  channelList(): Array<string> {
    return ['card', 'bank', 'ussd'];
  }
}
