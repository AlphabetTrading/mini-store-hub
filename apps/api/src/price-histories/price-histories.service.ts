import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePriceHistoryInput } from './dto/create-product.input';
import { UpdatePriceHistoryInput } from './dto/update-product.input';

@Injectable()
export class PriceHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePriceHistoryInput) {
    return this.prisma.priceHistory.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.priceHistory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.priceHistory.findUnique({ where: { id } });
  }

  async findByProductId(productId: string) {
    return this.prisma.priceHistory.findMany({ where: { productId } });
  }

  async update(id: string, data: UpdatePriceHistoryInput) {
    return this.prisma.priceHistory.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.priceHistory.delete({ where: { id } });
  }
}
