import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
@EntityRepository(Transaction)
export class TransactionRepository extends Repository<Transaction> {}
