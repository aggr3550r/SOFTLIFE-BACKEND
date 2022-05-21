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
    if (!create_user_dto.email || !create_user_dto.password) {
      return null;
    }
    const user = this.userRepository.create(create_user_dto);
    return await this.userRepository.save(user);
  }

  async find(email: string): Promise<User[]> {
    if (!email) {
      return null;
    }
    return await this.userRepository.find({ email });
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

  async findOne(id: string): Promise<User> {
    if (!id) {
      return null;
    }
    return await this.userRepository.findOne(id);
  }

  async update(id: string, body: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, body);
    return this.userRepository.save(user);
  }

  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return this.userRepository.remove(user);
  }
}
