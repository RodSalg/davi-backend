import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { prisma } from 'src/main';

@Injectable()
export class ProductsService {

  async findAll() {
    return await prisma.products.findMany();
  }

  async findOne(id: string) {
    return await prisma.products.findUnique({
      where: { id: id }
    });
  }


}
