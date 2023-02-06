import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.products.create({
      data: createProductDto,
    });
  }

  findAll() {
    return this.prisma.products.findMany({
      include: {
        users: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.products.findUnique({
      where: {
        id,
      },
      include: {
        users: true
      }
    });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prisma.products.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prisma.products.delete({
      where: {
        id,
      },
    });
  }
}
