import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PageDTO } from 'src/dtos/page.dto';
import { PageOptionsDTO } from 'src/dtos/pageoption.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ContactService } from './contact.service';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessageDTO } from './dtos/message.dto';
import { UpdateMessageDTO } from './dtos/update-message.dto';
import { Message } from './entities/message.entity';

@Controller('contact-us')
@Serialize(MessageDTO)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  @UseGuards(AuthGuard)
  sendMessage(@Body() body: CreateMessageDTO): Promise<Message> {
    const message = this.contactService.createMessage(body);
    return message;
  }

  @Get('all-messages')
  @UseGuards(AdminGuard)
  getAllMessages(
    @Query() page_options_dto: PageOptionsDTO,
  ): Promise<PageDTO<Message>> {
    return this.contactService.findAllMessages(page_options_dto);
  }

  @Post('reply-message/:id')
  @UseGuards(AdminGuard)
  replyMessage(@Param('id') id: string, @Body() body: UpdateMessageDTO) {
    return this.contactService.update(id, body);
  }

  @Get('replied-messages')
  @UseGuards(AdminGuard)
  getUnrepliedMessages(): Promise<Message[]> {
    return this.contactService.findAllRepliedMessages();
  }
}
