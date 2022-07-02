import { RequeryStatus } from 'src/enums/requery.status.enum';
import { PaystackRequeryResponse } from './IPaystackRequeryStatus';

export interface ISoftlifeRequeryResponse {
  reference: string;
  status: RequeryStatus;
  provider_response?: PaystackRequeryResponse;
}
