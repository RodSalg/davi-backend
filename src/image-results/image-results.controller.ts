import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImageResultsService } from './image-results.service';
import { CreateImageResultDto } from './dto/create-image-result.dto';
import { UpdateImageResultDto } from './dto/update-image-result.dto';

@Controller('image-results')
export class ImageResultsController {
  constructor(private readonly imageResultsService: ImageResultsService) {}

  @Post()
  create(@Body() createImageResultDto: CreateImageResultDto) {
    return this.imageResultsService.create(createImageResultDto);
  }

  @Get()
  findAll() {
    return this.imageResultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageResultsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageResultDto: UpdateImageResultDto) {
    return this.imageResultsService.update(+id, updateImageResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageResultsService.remove(+id);
  }
}
