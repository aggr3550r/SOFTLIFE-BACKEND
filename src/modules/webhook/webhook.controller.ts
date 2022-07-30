import { Controller, HttpCode, Inject, Post, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaystackEvent } from 'src/enums/paystack/paystack.event.enum';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import { InvalidRequestOriginException } from 'src/exceptions/InvalidRequestOriginException';
import { PaystackWebhookResponseModel } from 'src/models/paystack-response.model';
import { PaystackWebhookResponseRepository } from 'src/models/paystack-webhook/paystack-webhook.repository';
import { ResponseModel } from 'src/models/response.model';
import SecurityUtil from 'src/utils/security.util';
import { winstonLogger } from 'src/utils/winston';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  @InjectRepository(PaystackWebhookResponseRepository)
  private paystackWebhookResponseRepository: PaystackWebhookResponseRepository;

  @Inject()
  private webhookService: WebhookService;

  constructor() {}

  @HttpCode(200)
  @Post('paystack/listen')
  async paystackWebhookProcessor(
    @Req()
    paystack_webhook_response: PaystackWebhookResponseModel<any>,
  ) {
    try {
      const paystack_stringified_payload = JSON.stringify(
        paystack_webhook_response,
      );

      const paystack_hash = await SecurityUtil.createPaystackHash(
        paystack_stringified_payload,
      );

      if (
        paystack_hash ==
        paystack_webhook_response.data.headers['x-paystack-signature']
      ) {
        await this.paystackWebhookResponseRepository.save({
          event: paystack_webhook_response.event,
          response_id: paystack_webhook_response?.data.id,
          event_identifier: paystack_webhook_response?.data.reference,
          response: paystack_stringified_payload,
        });

        switch (paystack_webhook_response.event) {
          case PaystackEvent.CHARGE_SUCCESS:
            this.webhookService.chargeSuccessHandler(paystack_webhook_response);
            break;

          default:
            return new ResponseModel(
              SoftlifeResponseStatus.NOT_FOUND,
              'This application does not yet handle events of this kind.',
              null,
            );
        }
        return 'ok';
      } else {
        throw new InvalidRequestOriginException("You're a thief, aren't you?");
      }
    } catch (error) {
      winstonLogger.info('paystackWebhookProcessor() error');
      winstonLogger.error(error);
    }
  }
}
