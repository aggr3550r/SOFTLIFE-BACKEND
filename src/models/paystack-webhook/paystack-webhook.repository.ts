import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { PaystackWebhookResponse } from './paystack-webhook.entity';

@Injectable()
@EntityRepository(PaystackWebhookResponse)
export class PaystackWebhookResponseRepository extends Repository<PaystackWebhookResponse> {}
