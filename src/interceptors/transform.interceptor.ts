import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import { ResponseModel } from 'src/models/response.model';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseModel<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseModel<T>> {
    let response;

    const request = context.switchToHttp().getRequest();

    const exclude = ['/virtualaccount/lookup/wema', '/webhook/wema/listen'];

    return next.handle().pipe(
      map((incomingResponse: any) => {
        if (request.method == 'POST' && exclude.includes(request.url)) {
          return incomingResponse;
        }

        if (incomingResponse instanceof ResponseModel) {
          response = incomingResponse;
        } else if (incomingResponse instanceof Error) {
          response = {
            statusCode: SoftlifeResponseStatus.FAILED,
            message: 'An Error occured',
            data: null,
          };
        } else if (incomingResponse instanceof HttpException) {
          response = {
            statusCode: SoftlifeResponseStatus.FAILED,
            message: 'An Error occured',
            data: null,
          };
        } else if (
          (incomingResponse &&
            incomingResponse.stack &&
            incomingResponse.message) ||
          (incomingResponse.statusCode && incomingResponse.statusCode !== '00')
        ) {
          response = {
            statusCode: '99',
            message: 'An Error occured',
            data: incomingResponse.data || incomingResponse.message,
          };
        } else if (!incomingResponse) {
          response = {
            statusCode: '99',
            message: 'An Error occured',
            data: null,
          };
        } else {
          response = {
            statusCode: '00',
            message: 'Operation successful',
            data: incomingResponse,
          };
        }

        return response;
      }),
    );
  }
}
