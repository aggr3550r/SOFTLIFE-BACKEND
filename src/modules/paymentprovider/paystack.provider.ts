import { forwardRef, Inject, Injectable } from '@nestjs/common';
import AbstractPaymentProvider from 'src/Abstract-Payment-Provider';
import { PaymentChannels } from 'src/enums/payment.channels.enum';
import { PaymentProviders } from 'src/enums/payment.provider.enum';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import IClientInfo from 'src/interfaces/payment-interfaces/IClientInfo';
import { ResponseModel } from 'src/models/response.model';
import RequestUtil from 'src/utils/request.util';
import { winstonLogger } from 'src/utils/winston';
import { CreateTransactionDTO } from '../transaction/dtos/create-transaction.dto';
import { GeneratePaymentLinkDto } from '../transaction/dtos/init-transaction.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PaystackProvider extends AbstractPaymentProvider {
  private readonly paystack_base_url = process.env.PAYSTACK_BASE_URL;

  protected readonly paystack_auth_header = {
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

      const customer_information: IClientInfo = {
        email: generate_payment_link_dto.email,
        amount: this.convertNairaToKobo(generate_payment_link_dto.amount),
        reference: this.generateTransactionReference(),
        currency: generate_payment_link_dto.currency,
        channels: this.channelList(),
      };

      const payment_link_generation_endpoint = this.paystack_base_url.concat(
        process.env.PAYSTACK_INITIALIZE_TRANSACTION_URL,
      );

      winstonLogger.info(
        'Payment Link Transaction Endpoint: %s',
        payment_link_generation_endpoint,
      );

      const paystack_response = await RequestUtil.makePostRequest(
        payment_link_generation_endpoint,
        customer_information,
        this.paystack_auth_header,
      );

      const transaction_data: CreateTransactionDTO = {
        initiator: await this.getInitiator(generate_payment_link_dto.email),
        reference: customer_information.reference,
        client_reference: generate_payment_link_dto.client_reference,
        request: JSON.stringify(generate_payment_link_dto),
        response: JSON.stringify(paystack_response.data.data),
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

  async fetchTransaction() {}

  protected getRefPrefix(): string {
    return 'PYSTK';
  }

  /**
   * Gets the initiator id which is the id of the signed in user
   * @params user email
   * @returns user id
   */
  protected async getInitiator(email: string): Promise<string> {
    const user_id = (await this.userService.findByEmail(email)).id;
    return user_id;
  }
  channelList(): Array<string> {
    return ['card', 'bank', 'ussd'];
  }
}
