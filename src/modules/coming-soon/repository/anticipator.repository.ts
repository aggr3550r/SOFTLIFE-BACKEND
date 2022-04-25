import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository} from 'typeorm';
import { Anticipator } from '../entities/anticipator.entity';

@Injectable()
@EntityRepository(Anticipator)
export class AnticipatorRepository extends Repository<Anticipator> {}