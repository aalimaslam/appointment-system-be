import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { sendMailDto } from './dto/send-mail.dto';

@Injectable()
export class MailService {
  constructor(private readonly configService: ConfigService) {}

  mailTransporter() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    });

    return transporter;
  }

  async sendEmail(dto: sendMailDto) {
    const { recipients, subject, html } = dto;
    const transporter = this.mailTransporter();
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.configService.get<string>('MAIL_FROM'),
      to: recipients,
      subject,
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return { message: 'Email sent successfully' };
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
