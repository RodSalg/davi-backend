import { Test, TestingModule } from '@nestjs/testing';
import { PassConditionsController } from './pass-conditions.controller';
import { PassConditionsService } from './pass-conditions.service';

describe('PassConditionsController', () => {
  let controller: PassConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassConditionsController],
      providers: [PassConditionsService],
    }).compile();

    controller = module.get<PassConditionsController>(PassConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
