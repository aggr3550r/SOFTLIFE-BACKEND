import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from '../base.model';

@Entity('paystack-webhook-responses')
export class PaystackWebhookResponse extends BaseModel {
  @Index()
  @Column({ nullable: true })
  event: string;

  @Index()
  @Column({ nullable: true })
  response_id: string;

  @Index()
  @Column({ nullable: true })
  event_identifier: string;

  @Index()
  @Column({ type: 'text', nullable: true })
  response: string;
}
