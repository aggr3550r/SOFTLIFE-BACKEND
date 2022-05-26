import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { MessageRepository } from './repository/message.repository';
import { winstonLogger } from 'src/utils/winston';
import winston from 'winston/lib/winston/config';
import { ResponseModel } from 'src/models/response.model';
import {
  SoftlifeResponseStatus,
  SoftlifeResponseStatusMessage,
} from 'src/enums/softife.response.enum';
import { CreateMessageDTO } from './dtos/create-message.dto';

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

  async findAllMessages(): Promise<Message[]> {
    const data = await this.messageRepository.find();
    return data;
  }

  async findAllRepliedMessages(): Promise<any[]> {
    try {
      const messages = await this.findAllMessages();
      const repliedMessages = [];
      messages.forEach((message) => {
        if (message.replied) repliedMessages.push(message);
      });
      return repliedMessages;
    } catch (error) {
      winstonLogger.error('findAllMessages() error \n %s', error);
    }
  }

  async update(id: number, body: UpdateMessageDTO) {
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
