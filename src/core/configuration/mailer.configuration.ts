import { registerAs } from '@nestjs/config';

export default registerAs('mailer', () => ({
    mailService: process.env.MAIL_SERVICE,
    mailApiKey: process.env.MAIL_API_KEY,
    mailApiUser: process.env.MAIL_API_USER,
    fromEmail: process.env.FROM_EMAIL,
    mailSecure: process.env.MAIL_SECURE === 'true',
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
}));
