import { Module } from '@nestjs/common';
import { ImageResultsService } from './image-results.service';
import { ImageResultsController } from './image-results.controller';

@Module({
  controllers: [ImageResultsController],
  providers: [ImageResultsService],
})
export class ImageResultsModule {}
