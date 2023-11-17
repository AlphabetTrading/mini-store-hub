import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';
import { Prisma, RecipientType } from '@prisma/client';
import { CreateBulkSaleTransactionInput } from './dto/create-bulk-sale-transaction.input';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEvent } from 'src/notification/events/notification.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];

    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        product: {
          id: productId,
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

  async totalSoldQuantityByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        saleTransaction: {
          retailShopId: retailShopId,
        },
        productId: productId,
      },
      _sum: {
        quantity: true,
      },
    });
    const total = response._sum.quantity;
    return total;
  }

  async totalSoldQuantityByRetailShop(retailShopId: string) {
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        saleTransaction: {
          retailShopId: retailShopId,
        },
      },
      _sum: {
        quantity: true,
      },
    });
    const total = response._sum.quantity;
    return total;
  }

  async totalSoldQuantityByProduct(productId: string) {
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        productId: productId,
      },
      _sum: {
        quantity: true,
      },
    });
    const total = response._sum.quantity;
    return total;
  }

  async totalSoldQuantityByDate(
    retailShopId: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];

    // check if the retailshop exists

    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id: retailShopId },
    });

    if (!retailShop) {
      throw new NotFoundException('Retail Shop not found');
    }

    const res = await this.prisma.saleTransactionItem.findMany({
      where: {
        saleTransaction: {
          retailShopId,
        },
      },
    });

    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        saleTransaction: {
          retailShopId: retailShopId,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },

      _sum: {
        quantity: true,
        subTotal: true,
      },
    });

    const total = response._sum.quantity ?? 0;
    return total;
  }

  async totalSoldProductsByRetailShopAndDate(
    retailShopId: string,
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
          retailShopId: retailShopId,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _count: {
        id: true,
      },
    });
    const total = response._count.id ?? 0;
    return total;
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
        orderBy: {
          createdAt: 'desc',
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

  // calculate ranks of retail shops by total sales
  async retailShopRankByTotalSales(
    startDate: string,
    endDate: string,
    skip: number,
    take: number,
  ) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const retailShops = await this.prisma.retailShop.findMany({
      where: {
        saleTransaction: {
          every: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        saleTransaction: true,
      },
    });

    const retailShopsWithTotalSales = retailShops.map((retailShop) => {
      const totalSales = retailShop.saleTransaction.reduce((acc, curr) => {
        return acc + curr.totalPrice;
      }, 0);
      return {
        ...retailShop,
        totalSales,
      };
    });

    const sortedRetailShops = retailShopsWithTotalSales.sort((a, b) => {
      return b.totalSales - a.totalSales;
    });

    return sortedRetailShops.slice(skip, skip + take);
  }

  // calculate ranks of retail shops by total profit
  async retailShopRankByTotalProfit(
    startDate: string,
    endDate: string,
    skip: number,
    take: number,
  ) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const retailShops = await this.prisma.retailShop.findMany({
      where: {
        saleTransaction: {
          every: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        saleTransaction: {
          include: {
            saleTransactionItems: {
              include: {
                product: {
                  include: {
                    activePrice: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const retailShopsWithTotalProfit = retailShops.map((retailShop) => {
      const totalProfit = retailShop.saleTransaction.reduce((acc, curr) => {
        const profit = curr.saleTransactionItems.reduce((acc, curr) => {
          const {
            subTotal,
            quantity,
            product: {
              activePrice: { purchasedPrice },
            },
          } = curr;
          const profit = subTotal - purchasedPrice * quantity;
          return acc + profit;
        }, 0);
        return acc + profit;
      }, 0);
      return {
        ...retailShop,
        totalProfit,
      };
    });

    const sortedRetailShops = retailShopsWithTotalProfit.sort((a, b) => {
      return b.totalProfit - a.totalProfit;
    });

    return sortedRetailShops.slice(skip, skip + take);
  }

  // calculate ranks of retail shops by total number of transactions
  async retailShopRankByTotalTransactions(
    startDate: string,
    endDate: string,
    skip: number,
    take: number,
  ) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const retailShops = await this.prisma.retailShop.findMany({
      where: {
        saleTransaction: {
          every: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      include: {
        saleTransaction: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const retailShopsWithTotalTransactions = retailShops.map((retailShop) => {
      const totalTransactions = retailShop.saleTransaction.length;
      return {
        ...retailShop,
        totalTransactions,
      };
    });

    const sortedRetailShops = retailShopsWithTotalTransactions.sort((a, b) => {
      return b.totalTransactions - a.totalTransactions;
    });

    return sortedRetailShops.slice(skip, skip + take);
  }

  // calculate ranks of products by total sales
  async productRankByTotalSales(
    startDate: string,
    endDate: string,
    skip: number,
    take: number,
  ) {
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    const products = await this.prisma.product.findMany({
      where: {
        saleTransactionItem: {
          some: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      include: {
        saleTransactionItem: true,
      },
    });

    const productsWithTotalSales = products.map((product) => {
      const totalSales = product.saleTransactionItem.reduce((acc, curr) => {
        return acc + curr.subTotal;
      }, 0);
      return {
        ...product,
        totalSales,
      };
    });

    const sortedProducts = productsWithTotalSales.sort((a, b) => {
      return b.totalSales - a.totalSales;
    });

    return sortedProducts.slice(skip, skip + take);
  }

  async totalSales() {
    const response = await this.prisma.saleTransaction.aggregate({
      _sum: {
        totalPrice: true,
      },
    });
    return response._sum.totalPrice ?? 0;
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
    return response._sum.totalPrice ?? 0;
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
    return response._sum.totalPrice ?? 0;
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
    const total = response._sum.subTotal ?? 0;
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
    const total = response._sum.subTotal ?? 0;
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
    const total = response._sum.subTotal ?? 0;
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

  async createSaleTransaction(
    userId: string,
    data: CreateBulkSaleTransactionInput,
  ) {
    const notification_tokens =
      await this.notificationService.getNotificationTokensByUserId(userId);
    const { goods, retailShopId } = data;

    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id: retailShopId },
    });
    if (!retailShop) {
      throw new NotFoundException('Retail shop not found');
    }

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

        const retailShopStock = await tx.retailShopStock.findUnique({
          where: {
            productId_retailShopId: {
              retailShopId: retailShopId,
              productId: productId,
            },
          },
        });

        // send notification if stock is less than 10
        if (retailShopStock.quantity < retailShopStock.maxQuantity * (1 / 10)) {
          this.logger.log(
            'Stock of ' +
              product.name +
              ' is less than 10, please restock the product',
          );
          const notification_id = uuidv4();

          this.eventEmitter.emitAsync(
            'notification.created',
            new NotificationEvent({
              notification_id: notification_id,
              notification_body:
                'Stock of ' + product.name + ' is less than 10',
              notification_title: 'Stock Alert',
              tokens: notification_tokens,
            }),
          );

          return this.notificationService.sendIndividualNotification({
            notification_id: notification_id,
            title: 'Stock Alert',
            body: 'Stock of ' + product.name + ' is less than 10',
            notificationId: notification_id,
            recipientType: RecipientType.USER,
            recipientId: userId,
          });
        }
      }
    });

    // calculate total price
    let totalPrice = 0;

    const goodsWithSubTotal = goods.map(async (good) => {
      if (good.quantity <= 0) {
        throw new BadRequestException('Invalid quantity');
      }
      const product = await this.prisma.product.findUnique({
        where: { id: good.productId },
        include: {
          activePrice: { include: {} },
        },
      });
      if (!product) {
        throw new NotFoundException('Product price not found');
      }
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      if (!product.activePrice) {
        throw new NotFoundException('Product has no active price');
      }

      if (product.activePrice.purchasedPrice === null) {
        throw new NotFoundException('Product has no purchased price');
      }
      const subTotal = product.activePrice.price * good.quantity;
      totalPrice += subTotal;
      return {
        ...good,
        subTotal: subTotal,
        soldPriceHistoryId: product.activePrice.id,
      };
    });
    const goodsWithSubTotalResolved = await Promise.all(goodsWithSubTotal);

    const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();

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
            data: goodsWithSubTotalResolved.map((item) => ({
              ...item,
              createdAt,
            })),
          },
        },
        createdAt,
      },
      include: {
        saleTransactionItems: true,
      },
    });
  }

  async update(id: string, data: UpdateSaleTransactionInput) {
    const saleTransaction = await this.prisma.saleTransaction.findUnique({
      where: { id },
      include: {
        saleTransactionItems: true,
      },
    });
    if (!saleTransaction) {
      throw new NotFoundException('Sale transaction not found');
    }

    const createdAt = data.createdAt
      ? new Date(data.createdAt)
      : saleTransaction.createdAt;

    const { goods, retailShopId } = data;

    return await this.prisma.$transaction(async (tx) => {
      // decrease the stock of the retail shop with the previous goods
      for (const saleTransactionItem of saleTransaction.saleTransactionItems) {
        const { productId, quantity } = saleTransactionItem;

        // check if the product exists
        const product = await tx.retailShopStock.findUnique({
          where: {
            productId_retailShopId: {
              retailShopId: saleTransaction.retailShopId,
              productId: productId,
            },
          },
          include: {
            activePrice: true,
          },
        });
        if (!product) {
          throw new NotFoundException('Product not found on retail shop');
        }

        await tx.retailShopStock.update({
          where: {
            productId_retailShopId: {
              retailShopId: saleTransaction.retailShopId,
              productId: productId,
            },
          },
          data: {
            quantity: {
              increment: quantity,
            },
          },
        });
      }
      // check if retail shop has enough stock
      for (const good of goods) {
        const { productId, quantity } = good;
        const retailShopStock = await tx.retailShopStock.findUnique({
          where: {
            productId_retailShopId: {
              retailShopId: retailShopId ?? saleTransaction.retailShopId,
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

        // update the retail shop stock with the new goods, and create the transaction
        await tx.retailShopStock.update({
          where: {
            productId_retailShopId: {
              retailShopId: retailShopId ?? saleTransaction.retailShopId,
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
      let totalPrice = 0;

      const goodsWithSubTotal = goods.map(async (good) => {
        if (good.quantity <= 0) {
          throw new BadRequestException('Invalid quantity');
        }
        const product = await tx.product.findUnique({
          where: { id: good.productId },
          include: {
            activePrice: { include: {} },
          },
        });
        if (!product) {
          throw new NotFoundException('Product price not found');
        }
        if (!product) {
          throw new NotFoundException('Product not found');
        }
        if (!product.activePrice) {
          throw new NotFoundException('Product has no active price');
        }

        if (product.activePrice.purchasedPrice === null) {
          throw new NotFoundException('Product has no purchased price');
        }
        const subTotal = product.activePrice.price * good.quantity;
        totalPrice += subTotal;
        return {
          ...good,
          subTotal: subTotal,
          soldPriceHistoryId: product.activePrice.id,
        };
      });
      const goodsWithSubTotalResolved: any[] = await Promise.all(
        goodsWithSubTotal,
      );
      
      // return await tx.saleTransaction.update({
      //   where: { id },
      //   data: {
      //     totalPrice,
      //     retailShop: {
      //       connect: {
      //         id: retailShopId ?? saleTransaction.retailShopId,
      //       },
      //     },
      //     saleTransactionItems: {
      //       deleteMany: {
      //         saleTransactionId: id,
      //       },
      //       createMany: {
      //         data: goodsWithSubTotalResolved,
      //       },
      //     },
      //   },
      //   include: {
      //     saleTransactionItems: true,
      //   },

      // }, );

      try {
        await tx.saleTransactionItem.deleteMany({
          where: {
            saleTransactionId: id,
          },
        });
      } catch (error) {
      }

      const res = await tx.saleTransaction.update({
        where: { id },
        data: {
          totalPrice,
          retailShop: {
            connect: {
              id: retailShopId ?? saleTransaction.retailShopId,
            },
          },
          createdAt,
        },
        include: {
          saleTransactionItems: true,
        },
      });

      await tx.saleTransactionItem.createMany({
        data: goodsWithSubTotalResolved.map((item) => ({
          ...item,
          saleTransactionId: id,
        })),
      });
      return res;
    });
  }
  async remove(id: string) {
    const saleTransaction = await this.prisma.saleTransaction.findUnique({
      where: { id },
    });
    if (!saleTransaction) {
      throw new NotFoundException('Sale transaction not found');
    }

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

  async totalProfitByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const salesTransactionsItems =
      await this.prisma.saleTransactionItem.findMany({
        where: {
          saleTransaction: {
            retailShopId: retailShopId,
          },
          productId: productId,
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

  async totalSalesByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const response = await this.prisma.saleTransactionItem.aggregate({
      where: {
        saleTransaction: {
          retailShopId: retailShopId,
        },
        productId: productId,
      },
      _sum: {
        subTotal: true,
        quantity: true,
      },
    });
    const total = response._sum.subTotal;
    return total;
  }

  async totalTransactionsByRetailShopAndDate(
    retailShopId: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.saleTransaction.aggregate({
      where: {
        retailShopId: retailShopId,
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _count: {
        id: true,
      },
    });
    const total = response._count.id ?? 0;
    return total;
  }
  async totalTransactionsByDate(startDate: string, endDate: string) {
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
      _count: {
        id: true,
      },
    });
    const total = response._count.id ?? 0;
    return total;
  }
}
