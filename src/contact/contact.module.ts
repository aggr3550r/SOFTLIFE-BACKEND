import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [ContactService],
  controllers: [ContactController]
})
export class ContactModule {}
