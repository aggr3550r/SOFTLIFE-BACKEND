import { Module } from '@nestjs/common';
import { WebookController } from './webook/webook.controller';
import { WebhookService } from './webhook/webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

@Module({
  controllers: [WebookController, WebhookController],
  providers: [WebhookService]
})
export class WebhookModule {}
