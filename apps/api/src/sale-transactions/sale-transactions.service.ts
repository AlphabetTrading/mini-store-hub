import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';
import { Prisma } from '@prisma/client';
import { CreateBulkSaleTransactionInput } from './dto/create-bulk-sale-transaction.input';

const salesTransactionInclude: Prisma.SaleTransactionInclude = {
  retailShop: true,
  saleTransactionItems: {
    include: {
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
  },
};

@Injectable()
export class SaleTransactionsService {
  private readonly logger = new Logger(SaleTransactionsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async totalProfitByProductByDate(
    productId: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const salesTransactionsItems =
      await this.prisma.saleTransactionItem.findMany({
        where: {
          product: {
            id: productId,
          },
          createdAt: {
            gte: formattedStartDate,
            lt: formattedEndDate,
          },
        },
        include: {
          product: {
            include: {
              activePrice: true,
            },
          },
        },
      });

    let overallProfit = 0;

    for (const salesTransactionItem of salesTransactionsItems) {
      const {
        subTotal,
        quantity,
        product: {
          activePrice: { purchasedPrice },
        },
      } = salesTransactionItem;
      const profit = subTotal - purchasedPrice * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }
  async totalSaleByProductByDate(
    productId: string,
    startDate: string,
    endDate: string,
  ) {
    // calculate totalSaleByProduct and date
  }
  async totalProfitByRetailShopByDate(
    id: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const salesTransactionsItems =
      await this.prisma.saleTransactionItem.findMany({
        where: {
          saleTransaction: {
            retailShopId: id,
          },
          createdAt: {
            gte: formattedStartDate,
            lt: formattedEndDate,
          },
        },
        include: {
          product: {
            include: {
              activePrice: true,
            },
          },
        },
      });

    let overallProfit = 0;

    for (const salesTransactionItem of salesTransactionsItems) {
      const {
        subTotal,
        quantity,
        product: {
          activePrice: { purchasedPrice },
        },
      } = salesTransactionItem;
      const profit = subTotal - purchasedPrice * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  async totalSales() {
    const response = await this.prisma.saleTransaction.aggregate({
      _sum: {
        totalPrice: true,
      },
    });
    return response._sum.totalPrice;
  }

  async totalSalesByDate(startDate: string, endDate: string) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        totalPrice: true,
      },
    });
    return response._sum.totalPrice;
  }

  async totalSalesByRetailShop(id: string) {
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        retailShopId: id,
      },
      _sum: {
        totalPrice: true,
      },
    });
    return response._sum.totalPrice;
  }

  async totalSalesByRetailShopByDate(
    id: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        saleTransaction: {
          retailShopId: id,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
        quantity: true,
      },
    });
    const total = response._sum.subTotal;
    return total;
  }

  async totalSalesByProduct(id: string) {
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        productId: id,
      },
      _sum: {
        subTotal: true,
        quantity: true,
      },
    });
    const total = response._sum.subTotal;
    return total;
  }

  async totalSalesByProductByDate(
    productId: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        productId,
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
        quantity: true,
      },
    });
    const total = response._sum.subTotal;
    return total;
  }

  async totalProfit() {
    try {
      const salesTransactionsItems =
        await this.prisma.saleTransactionItem.findMany({
          include: {
            product: {
              include: {
                activePrice: true,
              },
            },
          },
        });

      let overallProfit = 0;
      for (const salesTransactionItem of salesTransactionsItems) {
        const {
          subTotal,
          quantity,
          product: {
            activePrice: { purchasedPrice },
          },
        } = salesTransactionItem;
        if (subTotal === null || quantity === null || purchasedPrice === null) {
          throw new BadRequestException(
            'Invalid data, Purchase price is null, price is null or quantity is null',
          );
        }
        const profit = subTotal - purchasedPrice * quantity;
        overallProfit += profit;
      }

      return overallProfit;
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Invalid operation');
    }
  }

  // calculate total profit by retail shop
  async totalProfitByRetailShop(id: string) {
    const salesTransactionsItems =
      await this.prisma.saleTransactionItem.findMany({
        where: {
          saleTransaction: {
            retailShopId: id,
          },
        },
        include: {
          product: {
            include: {
              activePrice: true,
            },
          },
        },
      });

    let overallProfit = 0;

    for (const salesTransactionItem of salesTransactionsItems) {
      const {
        subTotal,
        quantity,
        product: {
          activePrice: { purchasedPrice },
        },
      } = salesTransactionItem;
      const profit = subTotal - purchasedPrice * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  // calculate profit by date
  async totalProfitByDate(startDate: string, endDate: string) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const salesTransactionsItems =
      await this.prisma.saleTransactionItem.findMany({
        where: {
          createdAt: {
            gte: formattedStartDate,
            lt: formattedEndDate,
          },
        },
        include: {
          product: {
            include: {
              activePrice: true,
            },
          },
        },
      });

    let overallProfit = 0;

    for (const salesTransactionItem of salesTransactionsItems) {
      const {
        subTotal,
        quantity,
        product: {
          activePrice: { purchasedPrice },
        },
      } = salesTransactionItem;
      const profit = subTotal - purchasedPrice * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  async findOne(id: string) {
    return this.prisma.saleTransaction.findUnique({
      where: { id },
      include: salesTransactionInclude,
    });
  }

  async count(where?: Prisma.SaleTransactionWhereInput): Promise<number> {
    return this.prisma.saleTransaction.count({ where });
  }

  async totalProfitByProduct(id: string) {
    const salesTransactions = await this.prisma.saleTransactionItem.findMany({
      where: {
        productId: id,
      },
      include: {
        product: {
          include: {
            activePrice: true,
          },
        },
      },
    });

    let overallProfit = 0;

    for (const salesTransaction of salesTransactions) {
      const {
        subTotal,
        product: {
          activePrice: { purchasedPrice },
        },
        quantity,
      } = salesTransaction;
      const profit = subTotal - purchasedPrice * quantity;
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
  }) {
    return this.prisma.saleTransaction.findMany({
      where,
      include: salesTransactionInclude,
      skip,
      take,
      orderBy,
    });
  }

  async createSaleTransaction(data: CreateBulkSaleTransactionInput) {
    const { goods, retailShopId } = data;
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id: retailShopId },
    });
    if (!retailShop) {
      throw new NotFoundException('Retail shop not found');
    }

    // calculate total price
    let totalPrice = goods.reduce(
      (acc, good) => acc + good.quantity * good.price,
      0,
    );

    // check if retail shop has enough stock
    for (const good of goods) {
      const { productId, quantity } = good;
      const retailShopStock = await this.prisma.retailShopStock.findUnique({
        where: {
          productId_retailShopId: {
            retailShopId: retailShopId,
            productId: productId,
          },
        },
        include: {
          product: {
            include: {
              activePrice: true,
            },
          },
        },
      });

      if (retailShopStock.quantity < quantity) {
        throw new NotFoundException(
          retailShopStock.product.name + ' has no enough stock',
        );
      }

      if (!retailShopStock.product.activePrice) {
        throw new NotFoundException('Product has no active price');
      }
    }

    // update retail shop stock, and create the transaction
    await this.prisma.$transaction(async (tx) => {
      for (const good of goods) {
        const { productId, quantity } = good;
        const product = await tx.product.findUnique({
          where: { id: productId },
          include: {
            activePrice: true,
          },
        });
        if (!product) {
          throw new NotFoundException('Product not found');
        }
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
      }
    });

    return await this.prisma.saleTransaction.create({
      data: {
        totalPrice,
        retailShop: {
          connect: {
            id: retailShopId,
          },
        },
        saleTransactionItems: {
          createMany: {
            data: goods.map((good) => {
              return {
                ...good,
                subTotal: good.price * good.quantity,
              };
            }),
          },
        },
      },
      include: {
        saleTransactionItems: true,
      },
    });
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

    // generate daily sells of a retail shop between two dates, group by the whole day transaction
    const sells = await this.prisma.saleTransaction.groupBy({
      by: ['createdAt'],
      where: {
        retailShopId: id,
        createdAt: {
          gte: startDateFormatted,
          lt: endDateFormatted,
        },
      },
      _sum: {
        totalPrice: true,
      },
      _count: {
        id: true,
      },
    });
    return sells;
  }
}

// generate monthly sells of a retail shop
