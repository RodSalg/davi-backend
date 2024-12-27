import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { UpdateReleaseDto } from './dto/update-release.dto';

@Controller('releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}



  @Get()
  async findAll() {
    return await this.releasesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.releasesService.findOne(id);
  }


}
