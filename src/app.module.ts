import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ImagesModule } from './images/images.module';
import { InspectionsModule } from './inspections/inspections.module';
import { PassConditionsModule } from './pass-conditions/pass-conditions.module';
import { ImageResultsModule } from './image-results/image-results.module';

@Module({
  imports: [ProductsModule, ImageResultsModule, ImagesModule, InspectionsModule, PassConditionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
