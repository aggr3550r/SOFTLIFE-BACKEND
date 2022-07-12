import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateTransactionException extends HttpException {
  constructor() {
    super('Duplicate transaction found!', HttpStatus.CONFLICT);
  }
}
