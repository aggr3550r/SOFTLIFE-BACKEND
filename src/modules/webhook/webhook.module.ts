import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaystackWebhookResponseRepository } from 'src/models/paystack-webhook/paystack-webhook.repository';
import { TransactionRepository } from 'typeorm';
import { PaymentProviderModule } from '../paymentprovider/paymentprovider.module';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';
@Module({
  controllers: [WebhookController, WebhookController],
  providers: [WebhookService],
  imports: [
    forwardRef(() => PaymentProviderModule),
    TypeOrmModule.forFeature([
      PaystackWebhookResponseRepository,
      TransactionRepository,
    ]),
  ],
})
export class WebhookModule {}
