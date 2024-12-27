import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageResultsService } from './image-results.service';
import { CreateImageResultDto } from './dto/create-image-result.dto';
import { UpdateImageResultDto } from './dto/update-image-result.dto';

@Controller('image-results')
export class ImageResultsController {
  constructor(private readonly imageResultsService: ImageResultsService) {}


  @Get()
  findAll() {
    return this.imageResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imageResultsService.findOne(id);
  }

}
