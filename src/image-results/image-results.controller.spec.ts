import { Test, TestingModule } from '@nestjs/testing';
import { ImageResultsController } from './image-results.controller';
import { ImageResultsService } from './image-results.service';

describe('ImageResultsController', () => {
  let controller: ImageResultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageResultsController],
      providers: [ImageResultsService],
    }).compile();

    controller = module.get<ImageResultsController>(ImageResultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
