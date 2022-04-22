import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ContactService } from './contact.service';
import { CreateMessageDTO } from './dtos/create-message.dto';
import { MessageDTO } from './dtos/message.dto';
import { UpdateMessageDTO } from './dtos/update-message.dto';

@Controller('contact-us')
@Serialize(MessageDTO)
export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post()
    @UseGuards(AuthGuard)
    sendMessage (@Body() body: CreateMessageDTO) {
        const message = this.contactService.create(body.name, body.email, body.message);
        return message;
    }

    @Get('/all-messages')
    @UseGuards(AdminGuard) 
    getAllMessages () {
        return this.contactService.findAllMessages()
    }

    @Post('reply-message/:id')
    @UseGuards(AdminGuard)
    replyMessage(@Param('id') id: string, @Body() body: UpdateMessageDTO) {
        return this.contactService.update(parseInt(id), body);
    }

    @Get('/replied-messages')
    @UseGuards(AdminGuard)
    getUnrepliedMessages() {
        return this.contactService.findAllRepliedMessages();
    }
    
}
