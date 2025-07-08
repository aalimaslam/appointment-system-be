import { Module } from '@nestjs/common';
import { BlobstorageService } from './blobstorage.service';
import { BlobstorageController } from './blobstorage.controller';

@Module({
  controllers: [BlobstorageController],
  providers: [BlobstorageService],
})
export class BlobstorageModule {}
