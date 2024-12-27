import { Injectable } from '@nestjs/common';
import { CreateManualDefectClassificationDto } from './dto/create-manual-defect-classification.dto';
import { UpdateManualDefectClassificationDto } from './dto/update-manual-defect-classification.dto';
import { prisma } from 'src/main';

@Injectable()
export class ManualDefectClassificationService {

  async findAll() {
    return await prisma.manual_Defect_Classifications.findMany();
  }

  async findOne(id: number) {
    return await prisma.manual_Defect_Classifications.findFirst({
      where: {id: id}
    }); 
  }


}
