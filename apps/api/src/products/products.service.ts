import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
        activePrice: true,
        priceHistory: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        activePrice: true,
        priceHistory: true,
        saleTransaction: true,
        goods: true,
        retailShopStock: true,
        warehouseStock: true,
      },
    });
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  async searchProduct(search: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            serialNumber: {
              equals: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async create(data: CreateProductInput) {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: UpdateProductInput) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
