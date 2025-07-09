import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import { sendMailDto } from './dto/send-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() dto: sendMailDto) {
    return await this.mailService.sendEmail(dto);
  }
}
