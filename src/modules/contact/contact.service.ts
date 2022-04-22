import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/contact.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateMessageDTO } from './dtos/update-message.dto';


@Injectable()
export class ContactService {
    constructor(@InjectRepository(Message) private repo: Repository<Message>) {}

    create(name: string, email: string, message: string) {
        const data = this.repo.create({name, email, message});
        return this.repo.save(data);
    }

    find(email: string) {
        if(!email){
            return null;
        }
        return this.repo.find({email});
    }

    findOne(id: number) {
        if(!id) {
            return null;
        }
        return this.repo.findOne(id);
    }

    async findAllMessages() {
        const data = await this.repo.find();
        return data;
    }

    async findAllRepliedMessages() {
        const messages = await this.findAllMessages();
        const repliedMessages = [];
        messages.forEach((message) => {
            if(message.replied) repliedMessages.push(message);
        });
        return repliedMessages;
    }

    async update(id: number, body: UpdateMessageDTO){
        const message = await this.findOne(id);
        if (!message) {
            throw new NotFoundException("Message not found");
        }
        Object.assign(message, body);
        return this.repo.save(message); 
    }
}
