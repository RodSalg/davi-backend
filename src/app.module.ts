import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { InspectionsModule } from './inspections/inspections.module';
import { PassConditionsModule } from './pass-conditions/pass-conditions.module';
import { ImageResultsModule } from './image-results/image-results.module';
import { ManualDefectClassificationModule } from './manual-defect-classification/manual-defect-classification.module';
import { ReleasesModule } from './releases/releases.module';

@Module({
  imports: [ProductsModule, ImageResultsModule, ImagesModule, InspectionsModule, PassConditionsModule, ManualDefectClassificationModule, ReleasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
