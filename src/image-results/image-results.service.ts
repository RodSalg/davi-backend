import { Injectable } from '@nestjs/common';
import { CreateImageResultDto } from './dto/create-image-result.dto';
import { UpdateImageResultDto } from './dto/update-image-result.dto';
import { prisma } from 'src/main';

@Injectable()
export class ImageResultsService {


  async findAll() {
    return await prisma.image_Results.findMany();
  }

  async findOne(id: number) {
    return await prisma.image_Results.findUnique({
      where: { id: id }
    });
  }

  async search(id: number) {
    return await prisma.image_Results.findUnique({
      where: { id: id }
    });
  }


}
