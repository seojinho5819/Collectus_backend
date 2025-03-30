import { ResponseCode } from './response.code';
import { ResponseStatus } from './response.status';

export interface HttpResponseInterface {
  status: ResponseStatus;
  code: ResponseCode;
  message?: string | string[];
  data?: unknown;
}
