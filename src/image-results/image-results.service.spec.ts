import { Test, TestingModule } from '@nestjs/testing';
import { ImageResultsService } from './image-results.service';

describe('ImageResultsService', () => {
  let service: ImageResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageResultsService],
    }).compile();

    service = module.get<ImageResultsService>(ImageResultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
