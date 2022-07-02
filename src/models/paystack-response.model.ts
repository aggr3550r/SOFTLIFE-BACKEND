import { PaystackEvent } from 'src/enums/paystack/paystack.event.enum';

export class PaystackWebhookResponseModel<T> {
  event: PaystackEvent;
  data: T;

  constructor(event: PaystackEvent, data: T) {
    this.event = event;
    this.data = data;
  }
}
