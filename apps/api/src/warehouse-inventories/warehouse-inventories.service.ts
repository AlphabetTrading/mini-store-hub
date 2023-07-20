import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWarehouseStockInput } from './dto/update-warehouse-inventory.input';
import { CreateWarehouseStockInput } from './dto/create-warehouse-inventory.input';
import { Prisma } from '@prisma/client';
import { WarehouseStock } from './models/warehouse-inventory.model';

const warehouseStockIncludeObject: Prisma.WarehouseStockInclude = {
  product: {
    include: {
      category: true,
      activePrice: true,
      goods: true,
      priceHistory: true,
      retailShopStock: true,
      saleTransaction: true,
    },
  },
  warehouse: {
    include: {
      address: true,
      goodsTransfersAsDestination: true,
      goodsTransfersAsSource: true,
    },
  },
};

@Injectable()
export class WarehouseStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.WarehouseStockWhereInput;
    orderBy?: Prisma.WarehouseStockOrderByWithRelationInput;
  }): Promise<WarehouseStock[]> {
    return this.prisma.warehouseStock.findMany({
      skip,
      take,
      where,
      orderBy,
      include: warehouseStockIncludeObject,
    });
  }

  async count(where?: Prisma.WarehouseStockWhereInput): Promise<number> {
    return this.prisma.warehouseStock.count({ where });
  }

  async findOne(id: string) {
    return this.prisma.warehouseStock.findUnique({
      where: { id },
      include: {
        product: true,
        warehouse: {
          include: {
            address: true,
            goodsTransfersAsDestination: true,
            goodsTransfersAsSource: true,
          },
        },
      },
    });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: {
        product: {
          include: {
            category: true,
            goods: true,
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            saleTransaction: true,
          },
        },
        warehouse: {
          include: {
            address: true,
            goodsTransfersAsDestination: true,
            goodsTransfersAsSource: true,
          },
        },
      },
    });
  }

  async create(data: CreateWarehouseStockInput) {
    return this.prisma.warehouseStock.create({ data });
  }

  async update(id: string, data: UpdateWarehouseStockInput) {
    return this.prisma.warehouseStock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.warehouseStock.delete({ where: { id } });
  }
}
