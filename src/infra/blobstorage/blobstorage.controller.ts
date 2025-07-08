import { Controller } from '@nestjs/common';
import { BlobstorageService } from './blobstorage.service';

@Controller('blobstorage')
export class BlobstorageController {
  constructor(private readonly blobstorageService: BlobstorageService) {}
}
