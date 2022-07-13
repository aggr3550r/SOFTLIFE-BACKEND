import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRequestOriginException extends HttpException {
  constructor(message?: string) {
    message = message || 'This request is from an invalid source!';
    super(message, HttpStatus.NOT_ACCEPTABLE);
  }
}
