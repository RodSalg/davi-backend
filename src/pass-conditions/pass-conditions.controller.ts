import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassConditionsService } from './pass-conditions.service';
import { CreatePassConditionDto } from './dto/create-pass-condition.dto';
import { UpdatePassConditionDto } from './dto/update-pass-condition.dto';

@Controller('pass-conditions')
export class PassConditionsController {
  constructor(private readonly passConditionsService: PassConditionsService) {}

  @Post()
  create(@Body() createPassConditionDto: CreatePassConditionDto) {
    return this.passConditionsService.create(createPassConditionDto);
  }

  @Get()
  findAll() {
    return this.passConditionsService.findAll();
  }





}
