import { Module } from '@nestjs/common';
import { InfraService } from './infra.service';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { MailModule } from './mail/mail.module';
import { BlobstorageModule } from './blobstorage/blobstorage.module';
import { PaymentModule } from './payment/payment.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  providers: [InfraService],
  imports: [DatabaseModule, CacheModule, MailModule, BlobstorageModule, PaymentModule, NotificationModule],
})
export class InfraModule {}
