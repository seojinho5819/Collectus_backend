import { Injectable } from '@nestjs/common';
import { ResponseStatus } from './response.status';
import { ResponseCode } from './response.code';
import { HttpResponseInterface } from './response.interface';

@Injectable()
export class HttpResponseProvider {
  ResponseError(
    code: ResponseCode,
    message?: string | string[],
    data?: Record<string, any>,
  ): HttpResponseInterface {
    return {
      status: ResponseStatus.ERROR,
      code,
      message,
      data,
    };
  }

  ResponseSuccess(data: any): HttpResponseInterface {
    return {
      status: ResponseStatus.SUCCESS,
      code: ResponseCode.OK,
      message: 'OK',
      data,
    };
  }
}
