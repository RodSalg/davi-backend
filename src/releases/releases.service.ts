import { Injectable } from '@nestjs/common';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { prisma } from 'src/main';

@Injectable()
export class ReleasesService {


  async findAll() {
    return await prisma.releases.findMany();
  }

  async findOne(id: number) {
    return await prisma.releases.findFirst({
      where: {id: id}
    }); 
  }



}
