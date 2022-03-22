import { Controller, Post, Query } from "@nestjs/common";
import { SendgridService } from "./sendgrid.service";

@Controller('mail')
export class MailController {
    constructor(
        private readonly sendgridService: SendgridService
    ){}

    @Post('send')
    async sendEmail(@Query('email') email) {
        const mail = {
            to: email,
            subject: 'Greeting Message from NestJS Sendgrid',
            from: '<send_grid_email_address>',
            text: 'Hello World from NestJS Sendgrid',
            html: '<h1>Hello World from NestJS Sendgrid</h1>'
        };

        return await this.sendgridService.send(mail);
    }


}