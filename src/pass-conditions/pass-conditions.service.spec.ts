import { Test, TestingModule } from '@nestjs/testing';
import { PassConditionsService } from './pass-conditions.service';

describe('PassConditionsService', () => {
  let service: PassConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassConditionsService],
    }).compile();

    service = module.get<PassConditionsService>(PassConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
