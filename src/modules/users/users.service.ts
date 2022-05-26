import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { PageMetaDTO } from 'src/dtos/pagemeta.dto';
import { PageDTO } from 'src/dtos/page.dto';
import { winstonLogger } from 'src/utils/winston';
import { CreateUserDTO } from './dtos/create-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async create(create_user_dto: CreateUserDTO): Promise<User> {
    const user = this.userRepository.create(create_user_dto);
    return await this.userRepository.save(user);
  }

  async find(email: string): Promise<User[]> {
    return await this.userRepository.find({ email });
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findEmails(page_options_dto: PageOptionsDTO) {
    try {
      const [items, count] = await this.userRepository.findAndCount({
        select: ['email'],
        order: {
          created_at: 'DESC',
        },
        skip: page_options_dto.skip,
        take: page_options_dto.take,
      });

      const page_meta_dto = new PageMetaDTO({
        total_items: count,
        page_options_dto,
      });

      return new PageDTO(items, page_meta_dto);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }
  async update(id: string, body: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      Object.assign(user, body);
      return this.userRepository.save(user);
    } catch (error) {
      winstonLogger.error('error \n %s', error);
    }
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
