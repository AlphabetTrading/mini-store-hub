import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateBulkRetailShopStockInput,
  CreateRetailShopStockInput,
} from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';
import { Prisma, RetailShopStock } from '@prisma/client';

const retailShopStockInclude: Prisma.RetailShopStockInclude = {
  product: {
    include: {
      category: true,
      activePrice: true,
      goods: true,
      priceHistory: true,
      saleTransactionItem: true,
    },
  },
  warehouse: true,
  retailShop: true,
};

@Injectable()
export class RetailShopStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.retailShopStock.findMany({
      include: retailShopStockInclude,
    });
  }

  async findOne(id: string) {
    const retailShopStock = await this.prisma.retailShopStock.findUnique({
      where: { id },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.findUnique({
      where: { id },
      include: retailShopStockInclude,
    });
  }

  async count(where: Prisma.RetailShopStockWhereInput) {
    return this.prisma.retailShopStock.count({ where });
  }

  async findByProductId(productId: string) {
    const retailShopStock = await this.prisma.retailShopStock.findFirst({
      where: { productId },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.findMany({
      where: { productId },
      include: retailShopStockInclude,
    });
  }

  async findByWarehouseId(warehouseId: string) {
    const retailShopStock = await this.prisma.retailShopStock.findFirst({
      where: { warehouseId },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.findMany({
      where: { warehouseId },
      include: retailShopStockInclude,
    });
  }

  async findByRetailShopId({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.RetailShopStockWhereInput;
    orderBy?: Prisma.RetailShopStockOrderByWithRelationInput;
  }): Promise<RetailShopStock[]> {
    return this.prisma.retailShopStock.findMany({
      skip,
      take,
      where,
      orderBy,
      include: retailShopStockInclude,
    });
  }

  async findByRetailShopIdAndProductId(
    retailShopId: string,
    productId: string,
  ) {
    const retailShopStock = await this.prisma.retailShopStock.findUnique({
      where: { productId_retailShopId: { productId, retailShopId } },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.findUnique({
      where: { productId_retailShopId: { productId, retailShopId } },
      include: retailShopStockInclude,
    });
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    const retailShopStock = await this.prisma.retailShopStock.findFirst({
      where: { productId, warehouseId },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.findMany({
      where: { productId, warehouseId },
      include: retailShopStockInclude,
    });
  }

  async create(data: CreateRetailShopStockInput) {
    return this.prisma.retailShopStock.create({
      data: {
        maxQuantity: data.quantity,
        ...data,
      },
    });
  }

  async createMany(data: CreateBulkRetailShopStockInput) {
    // implement using promise all
    const promises = data.goods.map(async (good) => {
      return await this.prisma.retailShopStock.upsert({
        where: {
          productId_retailShopId: {
            productId: good.productId,
            retailShopId: data.retailShopId,
          },
        },
        create: {
          maxQuantity: good.quantity,
          quantity: good.quantity,
          productId: good.productId,
          retailShopId: data.retailShopId,
          warehouseId: data.warehouseId,
        },
        update: {
          maxQuantity: {
            increment: good.quantity,
          },
          quantity: {
            increment: good.quantity,
          },
        },
      });
    });
    return Promise.all(promises);
  }
  async totalValuationByRetailShopId(retailShopId: string) {
    const retailShopStock = await this.prisma.retailShopStock.findFirst({
      where: { retailShopId },
    });

    if (!retailShopStock) {
      throw new Error('RetailShop stock not found');
    }

    const retailShopStocks = await this.prisma.retailShopStock.findMany({
      where: { retailShopId },
      include: {
        ...retailShopStockInclude,
        product: {
          include: {
            activePrice: true,
          },
        },
      },
    });
    return retailShopStocks.reduce((acc, cur) => {
      return acc + cur.quantity * cur.product.activePrice.price;
    }, 0);
  }

  async totalValuationByRetailShopIdAndDate(
    retailShopId: string,
    startDate: string,
    endDate: string,
  ) {
    const retailShopStock = await this.prisma.retailShopStock.findFirst({
      where: { retailShopId },
    });

    if (!retailShopStock) {
      throw new Error('RetailShop stock not found');
    }

    const retailShopStocks = await this.prisma.retailShopStock.findMany({
      where: {
        retailShopId,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        ...retailShopStockInclude,

        product: {
          include: {
            activePrice: true,
          },
        },
      },
    });

    return retailShopStocks.reduce((acc, cur) => {
      return acc + cur.quantity * cur.product.activePrice.price;
    }, 0);
  }

  async update(id: string, data: UpdateRetailShopStockInput) {
    const retailShopStock = await this.prisma.retailShopStock.findUnique({
      where: { id },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    const retailShopStock = await this.prisma.retailShopStock.findUnique({
      where: { id },
    });

    if (!retailShopStock) {
      throw new Error('Retail shop stock not found');
    }

    return this.prisma.retailShopStock.delete({ where: { id } });
  }
}
