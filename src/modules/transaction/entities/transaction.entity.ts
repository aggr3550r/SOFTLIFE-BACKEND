import { PaymentChannels } from 'src/enums/payment.channels.enum';
import { PaymentStatus } from 'src/enums/payment.status.enum';
import { BaseModel } from 'src/models/base.model';
import { Entity, Column } from 'typeorm';

@Entity()
export class Transaction extends BaseModel {
  @Column('decimal', { precision: 12, scale: 2 })
  amount: number;

  @Column({ type: 'text' })
  currency: string;

  @Column({ unique: true })
  reference: string;

  @Column({ nullable: true })
  client: string;

  @Column({ unique: true })
  client_reference: string;

  @Column({ type: 'text', nullable: true })
  request: string;

  @Column({ type: 'text', nullable: true })
  response: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    nullable: false,
  })
  status: PaymentStatus;

  @Column({ default: 0 })
  retries: number;

  @Column({
    type: 'enum',
    enum: PaymentChannels,
  })
  payment_mode: string;

  @Column({
    nullable: true,
  })
  processor: string;

  @Column({ nullable: true })
  authorization_url: string;

  @Column({ nullable: true })
  channel?: string;
}
