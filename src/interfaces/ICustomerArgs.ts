import { BillingAddress } from 'src/types/address.type';

export default interface ICustomerArgs {
  email_address?: string;
  phone_number: string;
  billing_address: BillingAddress;
}
