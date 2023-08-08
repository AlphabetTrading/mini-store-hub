import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWarehouseStockInput } from './dto/update-warehouse-inventory.input';
import {
  CreateBulkWarehouseStockInput,
  CreateWarehouseStockInput,
} from './dto/create-warehouse-inventory.input';
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
      saleTransactionItem: true,
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
      include: warehouseStockIncludeObject,
    });
  }

  async findByWarehouseId(warehouseId: string) {
    const warehouseStock = await this.prisma.warehouseStock.findFirst({
      where: { warehouseId },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    return this.prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: warehouseStockIncludeObject,
    });
  }

  async totalValuationByWarehouseId(warehouseId: string) {
    const warehouseStock = await this.prisma.warehouseStock.findFirst({
      where: { warehouseId },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    const warehouseStocks = await this.prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: {
        ...warehouseStockIncludeObject,
        product: {
          include: {
            activePrice: true,
          },
        },
      },
    });
    return warehouseStocks.reduce((acc, cur) => {
      return acc + cur.quantity * cur.product.activePrice.price;
    }, 0);
  }

  async totalValuationByWarehouseIdAndDate(
    warehouseId: string,
    startDate: string,
    endDate: string,
  ) {
    const warehouseStock = await this.prisma.warehouseStock.findFirst({
      where: { warehouseId },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    const warehouseStocks = await this.prisma.warehouseStock.findMany({
      where: {
        warehouseId,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        ...warehouseStockIncludeObject,

        product: {
          include: {
            activePrice: true,
          },
        },
      },
    });

    return warehouseStocks.reduce((acc, cur) => {
      return acc + cur.quantity * cur.product.activePrice.price;
    }, 0);
  }

  async create(data: CreateWarehouseStockInput) {
    return this.prisma.warehouseStock.create({ data });
  }

  async createMany(data: CreateBulkWarehouseStockInput) {
    // create, if exists update all the goods
    const promosis = data.goods.map(async (good) => {
      return this.prisma.warehouseStock.upsert({
        where: {
          productId_warehouseId: {
            productId: good.productId,
            warehouseId: data.warehouseId,
          },
        },
        update: {
          quantity: {
            increment: good.quantity,
          },
        },
        create: {
          productId: good.productId,
          warehouseId: data.warehouseId,
          quantity: good.quantity,
        },
      });
    });

    const res = await Promise.all(promosis);
    return res;
  }

  async update(id: string, data: UpdateWarehouseStockInput) {
    const warehouseStock = await this.prisma.warehouseStock.findUnique({
      where: { id },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    return this.prisma.warehouseStock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const warehouseStock = await this.prisma.warehouseStock.findUnique({
      where: { id },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    return this.prisma.warehouseStock.delete({ where: { id } });
  }
}
