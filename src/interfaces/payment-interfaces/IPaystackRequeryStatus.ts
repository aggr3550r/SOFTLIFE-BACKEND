export interface PaystackRequeryResponse {
  status: boolean;
  message: string;
  data: {
    integration: any;
    recipient: {
      domain: string;
      type: string;
      currency: string;
      name: string;
      details: {
        account_number: string;
        account_name: any;
        bank_code: string;
        bank_name: string;
      };
      description: string;
      metadata: string;
      recipient_code: string;
      active: boolean;
      email: any;
      id: any;
      integration: any;
      createdAt: string;
      updatedAt: string;
    };
    domain: string;
    amount: any;
    currency: string;
    reference: string;
    source: string;
    source_details: any;
    reason: string;
    status: string;
    failures: any;
    transfer_code: string;
    titan_code: any;
    transferred_at: any;
    id: any;
    createdAt: string;
    updatedAt: string;
  };
}
