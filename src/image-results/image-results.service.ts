import { Injectable } from '@nestjs/common';
import { CreateImageResultDto } from './dto/create-image-result.dto';
import { UpdateImageResultDto } from './dto/update-image-result.dto';

@Injectable()
export class ImageResultsService {
  create(createImageResultDto: CreateImageResultDto) {
    return 'This action adds a new imageResult';
  }

  findAll() {
    return `This action returns all imageResults`;
  }

  findOne(id: number) {
    return `This action returns a #${id} imageResult`;
  }

  update(id: number, updateImageResultDto: UpdateImageResultDto) {
    return `This action updates a #${id} imageResult`;
  }

  remove(id: number) {
    return `This action removes a #${id} imageResult`;
  }
}
