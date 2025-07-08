import { Test, TestingModule } from '@nestjs/testing';
import { BlobstorageController } from './blobstorage.controller';
import { BlobstorageService } from './blobstorage.service';

describe('BlobstorageController', () => {
  let controller: BlobstorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlobstorageController],
      providers: [BlobstorageService],
    }).compile();

    controller = module.get<BlobstorageController>(BlobstorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
