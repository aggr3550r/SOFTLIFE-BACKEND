// 1. Collect customer information for Paystack

import AbstractPaymentProvider from 'src/Abstract-Payment-Provider';

// 2. Initialize the transaction

// 3. Verify the status of the transaction

// 4. List transactions

// 5. Fetch a transaction

// 6. View transaction timeline

export class PaystackProvider extends AbstractPaymentProvider {
  paystackBaseUrl = process.env.PAYSTACK_BASE_URL;
  paystackAuthHeader = {
    Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  };

  constructor() {
    super();
  }

  async initializePaymentTransaction() {}
  async requeryPaymentTransaction() {}
  async fetchTransaction() {}

  protected getRefPrefix(): string {
    return 'PYSTK';
  }
}
