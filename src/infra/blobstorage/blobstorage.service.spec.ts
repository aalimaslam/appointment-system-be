import { Test, TestingModule } from '@nestjs/testing';
import { BlobstorageService } from './blobstorage.service';

describe('BlobstorageService', () => {
  let service: BlobstorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlobstorageService],
    }).compile();

    service = module.get<BlobstorageService>(BlobstorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
