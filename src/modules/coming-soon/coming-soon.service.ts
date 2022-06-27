import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { winstonLogger } from 'src/utils/winston';
import { AnticipatorRepository } from './repository/anticipator.repository';

@Injectable()
export class ComingSoonService {
  constructor(
    @InjectRepository(AnticipatorRepository)
    private anticipatorRepository: AnticipatorRepository,
  ) {}

  async create(email: string) {
    try {
      if (await this.anticipatorRepository.find({ email })) {
        throw new NotAcceptableException(
          'You are already on the waiting list!',
        );
      }
      const anticipator = this.anticipatorRepository.create({ email });
      return this.anticipatorRepository.save(anticipator);
    } catch (error) {
      winstonLogger.error('Create Anticipator error \n %s', error);
    }
  }

  find(email: string) {
    return this.anticipatorRepository.find({ email });
  }

  async findAll() {
    const anticipators = await this.anticipatorRepository.find({
      select: ['email'],
    });
    return anticipators;
  }

  async remove(id: number) {
    try {
      const anticipator = await this.anticipatorRepository.findOne(id);
      if (!anticipator) {
        throw new NotFoundException('User does not exist');
      }
      return this.anticipatorRepository.remove(anticipator);
    } catch (error) {
      winstonLogger.error('Remove Anticipator error \n %s', error);
    }
  }
}
