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
      goods: true,
      // priceHistory: true,
      retailShopStock: {
        include: {
          retailShop: true,
          retailShopTransactionItems: true,
          priceHistory: true,
        },
      },
      warehouseStock: true,
      // saleTransactionItem: true,
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
    where,
    skip,
    take,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.WarehouseStockWhereInput;
    orderBy?: Prisma.WarehouseStockOrderByWithRelationInput;
  }): Promise<WarehouseStock[]> {
    return this.prisma.warehouseStock.findMany({
      where,
      skip,
      take,
      orderBy,
      include: warehouseStockIncludeObject,
    });
  }

  async count(where?: Prisma.WarehouseStockWhereInput): Promise<number> {
    return this.prisma.warehouseStock.count({ where });
  }

  async findOne(id: string) {
    const warehouseStock = await this.prisma.warehouseStock.findUnique({
      where: { id },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

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

    const stocks = await this.prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: {
        activePrice: true,
        product: {
          include: {
            category: true,
            goods: true,
            retailShopStock: {
              include: {
                retailShop: true,
                retailShopTransactionItems: true,
                priceHistory: true,
                activePrice: true,
              },
            },
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

    stocks.sort((a, b) => {
      return (
        b.activePrice.price * b.quantity -
        a.activePrice.price * a.quantity
      );
    });

    return stocks;
  }

  async find({ sourceWarehouseId }: { sourceWarehouseId: string }) {
    // sort by the amount of goods transfered

    const warehouseStocks = await this.prisma.goodsTransfer.findMany({
      // include: {
      //   ...warehouseStockIncludeObject,
      //   goods: {
      //     include: {
      //       product: {
      //         include: {
      //           // activePrice: true,
      //         },
      //       },
      //     },
      //   },
      // },
      include: {
        goods: {
          include: {
            product: {
              include: {
                retailShopStock: {
                  where: {
                    warehouseId: sourceWarehouseId,
                  },
                  include: {
                    activePrice: true,
                  }
                }
              },
            },
          }
        }
      },
      where: {
        sourceWarehouseId,
      },
    });

    const sortedGoodsTransfer = warehouseStocks.sort((a, b) => {
      return (
        a.goods.reduce((acc, cur) => {
          return acc + cur.product.retailShopStock[0].activePrice.price * cur.quantity;
        }, 0) -
        b.goods.reduce((acc, cur) => {
          return acc + cur.product.retailShopStock[0].activePrice.price * cur.quantity;
        }, 0)
      );
    });

    return sortedGoodsTransfer.map((goodsTransfer) => {
      return {
        ...goodsTransfer,
        goods: goodsTransfer.goods.map((good) => {
          return {
            ...good,
            product: {
              ...good.product,
              // activePrice: {
              //   ...good.product.activePrice,
              //   price: good.product.activePrice.price * good.quantity,
              // },
            },
          };
        }),
      };
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
            // activePrice: true,
          },
        },
      },
    });
    return {
      totalValuation: warehouseStocks.reduce((acc, cur) => {
        return acc + cur.quantity * cur.activePrice.price;
      }, 0),
      totalQuantity: warehouseStocks.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0),
      count: warehouseStocks.length,
    };
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
          },
        },
      },
    });

    return {
      totalValuation: warehouseStocks.reduce((acc, cur) => {
        return acc + cur.quantity * cur.activePrice.price;
      }, 0),
      totalQuantity: warehouseStocks.reduce((acc, cur) => {
        return acc + cur.quantity;
      }, 0),
      count: warehouseStocks.length,
    };
  }

  // find low stock items based on the percentage of the max quantity, and the current quantity

  async findLowStockItems({
    warehouseId,
    percentage,
    skip,
    take,
  }: {
    skip?: number;
    take?: number;
    warehouseId: string;
    percentage: number;
  }) {
    const warehouseStock = await this.prisma.warehouseStock.findFirst({
      where: { warehouseId },
    });

    if (!warehouseStock) {
      throw new Error('Warehouse stock not found');
    }

    const warehouseStocks = await this.prisma.warehouseStock.findMany({
      where: {
        warehouseId,
        quantity: {
          lte: warehouseStock.maxQuantity * (percentage / 100),
        },
      },
      include: {
        ...warehouseStockIncludeObject,
        product: {
          include: {
            category: true,
          },
        },
      },
      skip,
      take,
    });

    return warehouseStocks;
  }

  async create(data: CreateWarehouseStockInput) {
    return this.prisma.warehouseStock.create({
      data: {
        ...data,
        maxQuantity: data.quantity || 0,
      },
    });
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
          maxQuantity: good.quantity,
        },
        create: {
          productId: good.productId,
          warehouseId: data.warehouseId,
          quantity: good.quantity,
          maxQuantity: good.quantity,
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
