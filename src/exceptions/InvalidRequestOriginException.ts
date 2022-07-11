import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRequestOriginException extends HttpException {
  constructor() {
    super('This request is from an invalid source!', HttpStatus.NOT_ACCEPTABLE);
  }
}
