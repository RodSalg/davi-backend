import { PartialType } from '@nestjs/mapped-types';
import { CreatePassConditionDto } from './create-pass-condition.dto';

export class UpdatePassConditionDto extends PartialType(CreatePassConditionDto) {}
