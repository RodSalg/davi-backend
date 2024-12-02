import { Module } from '@nestjs/common';
import { PassConditionsService } from './pass-conditions.service';
import { PassConditionsController } from './pass-conditions.controller';

@Module({
  controllers: [PassConditionsController],
  providers: [PassConditionsService],
})
export class PassConditionsModule {}
