import { Injectable } from '@nestjs/common';
import { CreatePassConditionDto } from './dto/create-pass-condition.dto';
import { UpdatePassConditionDto } from './dto/update-pass-condition.dto';

@Injectable()
export class PassConditionsService {
  create(createPassConditionDto: CreatePassConditionDto) {
    return 'This action adds a new passCondition';
  }

  findAll() {
    return `This action returns all passConditions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} passCondition`;
  }

  update(id: number, updatePassConditionDto: UpdatePassConditionDto) {
    return `This action updates a #${id} passCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} passCondition`;
  }
}
