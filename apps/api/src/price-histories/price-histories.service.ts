import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePriceHistoryInput } from './dto/create-product-history.input';
import { UpdatePriceHistoryInput } from './dto/update-product-history.input';
import { Prisma } from '@prisma/client';
import { PriceHistory } from './models/price-history.model';

const priceHistoryIncludeObject: Prisma.PriceHistoryInclude = {
  // product: true,
  retailShopStock: true,
  warehouseStock: true,
};

@Injectable()
export class PriceHistoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePriceHistoryInput) {
    return this.prisma.priceHistory.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.priceHistory.findMany({
      include: priceHistoryIncludeObject,
    });
  }

  async findOne(id: string) {
    const priceHistory = await this.prisma.priceHistory.findUnique({
      where: { id },
    });

    if (!priceHistory) {
      throw new Error('Price history not found');
    }

    return this.prisma.priceHistory.findUnique({
      where: { id },
      include: priceHistoryIncludeObject,
    });
  }

  async count(where?: Prisma.PriceHistoryWhereInput): Promise<number> {
    return this.prisma.priceHistory.count({ where });
  }

  async findByProductId({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.PriceHistoryWhereInput;
    orderBy?: Prisma.PriceHistoryOrderByWithRelationInput;
  }): Promise<PriceHistory[]> {
    const result = await this.prisma.priceHistory.findMany({
      where,
      skip,
      take,
      orderBy,
      include: priceHistoryIncludeObject,
    });

    return result;
  }

  async update(id: string, data: UpdatePriceHistoryInput) {
    const priceHistory = await this.prisma.priceHistory.findUnique({
      where: { id },
    });

    if (!priceHistory) {
      throw new Error('Price history not found');
    }

    return this.prisma.priceHistory.update({ where: { id }, data });
  }

  async remove(id: string) {
    const priceHistory = await this.prisma.priceHistory.findUnique({
      where: { id },
    });

    if (!priceHistory) {
      throw new Error('Price history not found');
    }

    return this.prisma.priceHistory.delete({ where: { id } });
  }
}
