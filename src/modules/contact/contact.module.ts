import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageRepository } from './repository/message.repository';
import { Message } from './entities/message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, MessageRepository])],
  exports: [TypeOrmModule.forFeature([MessageRepository])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}
