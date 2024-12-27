import { Injectable } from '@nestjs/common';
import { CreateInspectionDto } from './dto/create-inspection.dto';
import { UpdateInspectionDto } from './dto/update-inspection.dto';
import { prisma } from 'src/main';

@Injectable()
export class InspectionsService {
  async findAll() {
    return await prisma.inspections.findMany();
  }

  async findOne(id: string) {
    return await prisma.inspections.findUnique({
      where: { id: id },
    });
  }
}
