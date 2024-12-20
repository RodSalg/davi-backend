import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';

@Module({
  controllers: [InspectionsController],
  providers: [InspectionsService],
})
export class InspectionsModule {}
