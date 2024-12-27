import { PartialType } from '@nestjs/swagger';
import { CreateManualDefectClassificationDto } from './create-manual-defect-classification.dto';

export class UpdateManualDefectClassificationDto extends PartialType(CreateManualDefectClassificationDto) {}
