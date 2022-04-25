import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { MessageRepository } from './repository/message.repository';


@Injectable()
export class ContactService {
    constructor(@InjectRepository(MessageRepository) private messageRepository: MessageRepository) {}

    create(name: string, email: string, message: string): Promise<Message> {
        const data = this.messageRepository.create({name, email, message});
        return this.messageRepository.save(data);
    }

    async find(email: string): Promise<Message[]> {
        if(!email){
            return null;
        }
        const data = await this.messageRepository.find({email}); 
        return data;
    }

    async findOne(id: number): Promise<Message> {
        if(!id) {
            return null;
        }
        const data = await this.messageRepository.findOne(id);
        return data; 
    }

    async findAllMessages(): Promise<Message[]> {
        const data = await this.messageRepository.find();
        return data;
    }

    async findAllRepliedMessages(): Promise<any[]> {
        const messages = await this.findAllMessages();
        const repliedMessages = [];
        messages.forEach((message) => {
            if(message.replied) repliedMessages.push(message);
        });
        return repliedMessages;
    }

    async update(id: number, body: UpdateMessageDTO): Promise<Message>{
        const message = await this.findOne(id);
        if (!message) {
            throw new NotFoundException("Message not found");
        }
        Object.assign(message, body);
        return this.messageRepository.save(message); 
    }
}
