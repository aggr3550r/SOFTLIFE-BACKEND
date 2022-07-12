import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentStatus } from 'src/enums/payment.status.enum';
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

  async fetchTransactionStatus(
    references: Array<string>,
  ): Promise<Array<{ reference: string; status: PaymentStatus }>> {
    if (!Array.isArray(references)) {
      throw new Error(
        `Unexpected data type provided. Expected array, got ${typeof references}`,
      );
    }

    const transactions = await this.transactionRepository
      .createQueryBuilder('transaction')
      .where('transaction.client_reference IN (:...refs)', {
        refs: references,
      })
      .getMany();

    const tmps = [];

    references.forEach((reference) => {
      const obj = transactions.find((transaction) => {
        transaction.client_reference == reference;
      });

      if (obj) tmps.push({ reference, status: obj.status });
      else tmps.push({ reference, status: PaymentStatus.NOT_FOUND });
    });

    return tmps;
  }
}
