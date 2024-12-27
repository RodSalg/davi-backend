import { Module } from '@nestjs/common';
import { ManualDefectClassificationService } from './manual-defect-classification.service';
import { ManualDefectClassificationController } from './manual-defect-classification.controller';

@Module({
  controllers: [ManualDefectClassificationController],
  providers: [ManualDefectClassificationService],
})
export class ManualDefectClassificationModule {}
