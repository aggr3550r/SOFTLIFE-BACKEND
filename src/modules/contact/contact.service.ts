import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { MessageRepository } from './repository/message.repository';
import { winstonLogger } from 'src/utils/winston';
import { ResponseModel } from 'src/models/response.model';
import { SoftlifeResponseStatus } from 'src/enums/softlife.response.enum';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { FindManyOptions } from 'typeorm';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { PageMetaDTO } from 'src/dtos/pagemeta.dto';
import { PageDTO } from 'src/dtos/page.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(MessageRepository)
    private messageRepository: MessageRepository,
  ) {}

  createMessage(body: CreateMessageDTO): Promise<Message> {
    try {
      const data = this.messageRepository.create(body);
      return this.messageRepository.save(data);
    } catch (error) {
      winstonLogger.error('createMessage() error \n %s', error);
    }
  }

  async findAllMessages(
    page_options_dto: PageOptionsDTO,
  ): Promise<PageDTO<Message>> {
    try {
      const [items, count] = await this.messageRepository.findAndCount({
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
      winstonLogger.error('findAllMessages() error \n %s', error);
    }
  }

  async findAllRepliedMessages(): Promise<Message[]> {
    try {
      const where: FindManyOptions<Message>['where'] = {};
      where.replied = true;
      const replied_messages = await this.messageRepository.find({ where });
      return replied_messages;
    } catch (error) {
      winstonLogger.error('findAllRepliedMessages() error \n %s', error);
    }
  }

  async update(id: string, body: UpdateMessageDTO) {
    try {
      const message = await this.messageRepository.findOne(id);
      if (!message) {
        return new ResponseModel(
          SoftlifeResponseStatus.NOT_FOUND,
          'Message not found!',
          null,
        );
      }
      Object.assign(message, body);
      return this.messageRepository.save(message);
    } catch (error) {
      winstonLogger.error('Update message error \n %s', error);
    }
  }
}
