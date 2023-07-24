import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleTransactionInput } from './dto/create-sale-transaction.input';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';
import { Prisma } from '@prisma/client';
import { SaleTransaction } from './models/sale-transaction.model';

@Injectable()
export class SaleTransactionsService {
  private readonly logger = new Logger(SaleTransactionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async totalProfitByProductByDate(
    productId: string,
    startDate: string,
    endDate: string,
  ) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        productId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }
  async totalProfitByRetailShopByDate(
    id: string,
    startDate: string,
    endDate: string,
  ) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        retailShopId: id,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSales() {
    const response = await this.prisma.saleTransaction.aggregate({
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSalesByDate(startDate: string, endDate: string) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSalesByRetailShop(id: string) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        retailShopId: id,
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSalesByRetailShopByDate(
    id: string,
    startDate: string,
    endDate: string,
  ) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        retailShopId: id,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSalesByProduct(id: string) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        productId: id,
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalSalesByProductByDate(
    productId: string,
    startDate: string,
    endDate: string,
  ) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        productId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }

  async totalProfit() {
    const salesTransactions = await this.prisma.saleTransaction.findMany();

    let overallProfit = 0;

    for (const salesTransaction of salesTransactions) {
      const { price, purchasedPrice, quantity } = salesTransaction;
      const profit = (price - purchasedPrice) * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  // calculate total profit by retail shop
  async totalProfitByRetailShop(id: string) {
    const salesTransactions = await this.prisma.saleTransaction.findMany({
      where: {
        retailShopId: id,
      },
    });

    let overallProfit = 0;

    for (const salesTransaction of salesTransactions) {
      const { price, purchasedPrice, quantity } = salesTransaction;
      const profit = (price - purchasedPrice) * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  // calculate profit by date
  async totalProfitByDate(startDate: string, endDate: string) {
    const salesTransactions = await this.prisma.saleTransaction.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    let overallProfit = 0;

    for (const salesTransaction of salesTransactions) {
      const { price, purchasedPrice, quantity } = salesTransaction;
      const profit = (price - purchasedPrice) * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.SaleTransactionWhereInput;
    orderBy?: Prisma.SaleTransactionOrderByWithRelationInput;
  }): Promise<SaleTransaction[]> {
    try {
      this.logger.error('test');
      return this.prisma.saleTransaction.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          retailShop: true,
          product: {
            include: {
              activePrice: true,
              priceHistory: true,
              retailShopStock: true,
              warehouseStock: true,
              category: true,
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async findOne(id: string) {
    return this.prisma.saleTransaction.findUnique({
      where: { id },
      include: {
        retailShop: true,
        product: {
          include: {
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            warehouseStock: true,
            category: true,
          },
        },
      },
    });
  }
  async count(where?: Prisma.SaleTransactionWhereInput): Promise<number> {
    return this.prisma.saleTransaction.count({ where });
  }

  async findAllByRetailShop(id: string) {
    return this.prisma.saleTransaction.findMany({
      where: { retailShopId: id },
      include: {
        retailShop: true,
        product: {
          include: {
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            warehouseStock: true,
            category: true,
          },
        },
      },
    });
  }
  async create(data: CreateSaleTransactionInput) {
    const { productId, retailShopId, quantity } = data;
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      include: {
        activePrice: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id: retailShopId },
    });

    if (!retailShop) {
      throw new NotFoundException('Retail shop not found');
    }

    // check if retail shop has enough stock
    const retailShopStock = await this.prisma.retailShopStock.findUnique({
      where: {
        productId_retailShopId: {
          retailShopId: retailShopId,
          productId: productId,
        },
      },
    });

    if (retailShopStock.quantity < quantity) {
      throw new NotFoundException('Not enough stock');
    }

    // update retail shop stock, and create the transaction
    return await this.prisma.$transaction(async (tx) => {
      await tx.retailShopStock.update({
        where: {
          productId_retailShopId: {
            retailShopId: retailShopId,
            productId: productId,
          },
        },
        data: {
          quantity: {
            decrement: quantity,
          },
        },
      });

      return await tx.saleTransaction.create({
        data: {
          price: product.activePrice.price,
          purchasedPrice: product.activePrice.purchasedPrice,
          quantity: quantity,
          retailShop: {
            connect: {
              id: retailShopId,
            },
          },
          product: {
            connect: {
              id: productId,
            },
          },
        },
      });
    });
  }
  async getTotal() {
    const response = await this.prisma.saleTransaction.aggregate({
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }
  async update(id: string, data: UpdateSaleTransactionInput) {
    return this.prisma.saleTransaction.update({ where: { id }, data });
  }
  async remove(id: string) {
    return this.prisma.saleTransaction.delete({ where: { id } });
  }
  // generate daily sells of a retail shop
  async dailySells(id: string, startDate: string, endDate: string) {
    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);
    //  const dateString = date.toISOString().split('T')[0];
  }
}
