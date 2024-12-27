import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManualDefectClassificationService } from './manual-defect-classification.service';
import { CreateManualDefectClassificationDto } from './dto/create-manual-defect-classification.dto';
import { UpdateManualDefectClassificationDto } from './dto/update-manual-defect-classification.dto';

@Controller('manual-defect-classification')
export class ManualDefectClassificationController {
  constructor(private readonly manualDefectClassificationService: ManualDefectClassificationService) {}

  @Get()
  findAll() {
    return this.manualDefectClassificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.manualDefectClassificationService.findOne(id);
  }

}
