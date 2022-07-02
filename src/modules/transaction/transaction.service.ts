import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDTO } from './dtos/create-transaction.dto';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(TransactionRepository)
    private transactionRepository: TransactionRepository,
  ) {}

  async create(create_transaction_dto: CreateTransactionDTO) {
    const transaction = this.transactionRepository.create(
      create_transaction_dto,
    );
    return this.transactionRepository.save(transaction);
  }

  async findByRef(reference: string) {
    return await this.transactionRepository.findOne({ reference });
  }

  async findByClientRef(client_reference: string) {
    return await this.transactionRepository.findOne({ client_reference });
  }

  async requery() {}
}
