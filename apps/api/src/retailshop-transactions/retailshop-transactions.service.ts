import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
// import { UpdateRetailShopTransactionInput } from './dto/update-retailshop-transaction.input';
import { Prisma, RecipientType, TransactionType } from '@prisma/client';
// import { CreateBulkRetailShopTransactionInput } from './dto/create-bulk-retailshop-transaction.input';
import { NotificationService } from 'src/notification/notification.service';
import { NotificationEvent } from 'src/notification/events/notification.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { v4 as uuidv4 } from 'uuid';
import { CreateBulkRetailShopTransactionInput } from './dto/create-bulk-retailshop-transaction.input';
import { UpdateRetailShopTransactionInput } from './dto/update-retailshop-transaction.input';

const retailShopTransactionInclude: Prisma.RetailShopTransactionInclude = {
  // retailShopStock: {
  //   include: {
  //     retailShop: true,
  //   },
  // },
  // retailShopTransactionItems: {
  //   include: {
  //     product: {
  //       include: {
  //         activePrice: true,
  //         priceHistory: true,
  //         retailShopStock: true,
  //         warehouseStock: true,
  //         category: true,
  //       },
  //     },
  //   },
  // },
  retailShop: true,
  retailShopTransactionItems: {
    include: {
      retailShopStock: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
          activePrice: true,
          priceHistory: true,
          warehouse: true,
        },
      },
      retailShopTransaction: true,
    },
  },
};

@Injectable()
export class RetailShopTransactionsService {
  private readonly logger = new Logger(RetailShopTransactionsService.name);

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
    const retailShopTransactionsItems =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          retailShopStock: {
            productId: productId,
          },
          createdAt: {
            gte: formattedStartDate,
            lt: formattedEndDate,
          },
        },
        include: {
          retailShopTransaction: {
            include: {
              retailShopTransactionItems: {
                include: {
                  retailShopStock: {
                    include: {
                      activePrice: true,
                      product: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    let overallProfit = 0;

    for (const retailShopTransactionItem of retailShopTransactionsItems) {
      const { quantity, sellingPrice, purchasePrice, transactionType } =
        retailShopTransactionItem;

      if (transactionType === TransactionType.SALE) {
        overallProfit += sellingPrice * quantity;
      } else {
        overallProfit -= purchasePrice * quantity;
      }
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

    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          productId: productId,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
      },
    });
    const total = response._sum.subTotal;
    return total;
  }

  async totalSoldQuantityByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          retailShopId: retailShopId,
          productId: productId,
        },
      },
      _sum: {
        quantity: true,
      },
    });
    const total = response._sum.quantity;
    return total;
  }

  async totalSoldQuantityByRetailShop(retailShopId: string) {
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopTransaction: {
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
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          productId: productId,
        },
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

    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopTransaction: {
          retailShopId: retailShopId,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },

      _sum: {
        quantity: true,
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
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopTransaction: {
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
    const retailShopTransactionsItems =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          retailShopTransaction: {
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
          retailShopStock: true,
          retailShopTransaction: true,
        },
      });

    let overallProfit = 0;

    for (const retailShopTransactionItem of retailShopTransactionsItems) {
      const { sellingPrice, purchasePrice, quantity, transactionType } =
        retailShopTransactionItem;

      if (transactionType === TransactionType.SALE) {
        const profit = sellingPrice * quantity;
        overallProfit += profit;
      } else {
        const profit = purchasePrice * quantity;
        overallProfit -= profit;
      }
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
        retailShopStock: {
          every: {
            retailShopTransactionItems: {
              every: {
                createdAt: {
                  gte: formattedStartDate,
                  lt: formattedEndDate,
                },
              },
            },
          },
        },
      },
      include: {
        retailShopStock: {
          include: {
            retailShopTransactionItems: {
              include: {
                retailShopStock: true,
                retailShopTransaction: true,
              },
            },
          },
        },
      },
    });

    const retailShopsWithTotalSales = retailShops.map((retailShop) => {
      const totalSales = retailShop.retailShopStock.reduce((acc, curr) => {
        const sales = curr.retailShopTransactionItems.reduce((acc, curr) => {
          const { quantity, sellingPrice, purchasePrice } = curr;
          if (curr.transactionType === TransactionType.SALE) {
            const sales = sellingPrice * quantity;
            return acc + sales;
          } else {
            const sales = purchasePrice * quantity;
            return acc - sales;
          }
        }, 0);
        return acc + sales;
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
        retailShopTransactions: {
          every: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      include: {
        retailShopStock: {
          include: {
            retailShopTransactionItems: {
              include: {
                retailShopTransaction: true,
              },
            },
          },
        },
      },
    });

    const retailShopsWithTotalProfit = retailShops.map((retailShop) => {
      const totalProfit = retailShop.retailShopStock.reduce((acc, curr) => {
        const profit = curr.retailShopTransactionItems.reduce((acc, curr) => {
          const { quantity, sellingPrice, purchasePrice } = curr;
          if (curr.transactionType === TransactionType.SALE) {
            const profit = sellingPrice * quantity;
            return acc + profit;
          } else {
            const profit = purchasePrice * quantity;
            return acc - profit;
          }
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
        retailShopTransactions: {
          every: {
            createdAt: {
              gte: formattedStartDate,
              lt: formattedEndDate,
            },
          },
        },
      },
      include: {
        retailShopTransactions: {
          include: {
            retailShopTransactionItems: true,
          },
        },
      },
    });

    const retailShopsWithTotalTransactions = retailShops.map((retailShop) => {
      const totalTransactions = retailShop.retailShopTransactions.reduce(
        (acc, curr) => {
          const transactions = curr.retailShopTransactionItems.length;
          return acc + transactions;
        },
        0,
      );
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
        retailShopStock: {
          some: {
            retailShopTransactionItems: {
              some: {
                createdAt: {
                  gte: formattedStartDate,
                  lt: formattedEndDate,
                },
              },
            },
          },
        },
      },
      include: {
        retailShopStock: {
          include: {
            retailShopTransactionItems: {
              include: {
                retailShopStock: true,
                retailShopTransaction: true,
              },
            },
          },
        },
      },
    });

    const productsWithTotalSales = products.map((product) => {
      const totalSales = product.retailShopStock.reduce((acc, curr) => {
        const sales = curr.retailShopTransactionItems.reduce((acc, curr) => {
          const { quantity, sellingPrice, purchasePrice } = curr;
          if (curr.transactionType === TransactionType.SALE) {
            const sales = sellingPrice * quantity;
            return acc + sales;
          } else {
            const sales = purchasePrice * quantity;
            return acc - sales;
          }
        }, 0);
        return acc + sales;
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
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
      },
      _sum: {
        subTotal: true,
      },
    });
    return response._sum.subTotal ?? 0;
  }

  async totalSalesByDate(startDate: string, endDate: string) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
      },
    });
    return response._sum.subTotal ?? 0;
  }

  async totalSalesByRetailShop(id: string) {
    const transactions = await this.prisma.retailShopTransaction.findMany({
      where: {
        retailShopId: id,
      },
      include: {
        retailShopTransactionItems: true,
      },
    });

    let total = 0;

    for (const transaction of transactions) {
      for (const retailShopTransactionItem of transaction.retailShopTransactionItems) {
        const { subTotal, transactionType } = retailShopTransactionItem;
        if (transactionType === TransactionType.SALE) {
          total += subTotal;
        }
      }
    }

    return total;
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
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          retailShopId: id,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
      },
    });
    const total = response._sum.subTotal ?? 0;
    return total;
  }

  async totalSalesByProduct(id: string) {
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          productId: id,
        },
      },
      _sum: {
        subTotal: true,
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
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        transactionType: TransactionType.SALE,
        retailShopStock: {
          productId,
        },
        createdAt: {
          gte: formattedStartDate,
          lt: formattedEndDate,
        },
      },
      _sum: {
        subTotal: true,
      },
    });
    const total = response._sum.subTotal ?? 0;
    return total;
  }

  async totalProfit() {
    try {
      const retailShopTransactionsItems =
        await this.prisma.retailShopTransactionItem.findMany({});

      let overallProfit = 0;
      for (const retailShopTransactionItem of retailShopTransactionsItems) {
        const {
          quantity,
          sellingPrice,
          purchasePrice,
          transactionType,
          subTotal,
        } = retailShopTransactionItem;
        if (transactionType === TransactionType.SALE) {
          const profit = sellingPrice * quantity;
          overallProfit += subTotal;
        } else {
          const profit = purchasePrice * quantity;
          overallProfit -= subTotal;
        }
      }

      return overallProfit;
    } catch (error) {
      throw new BadRequestException('Invalid operation');
    }
  }

  async totalProfitByRetailShop(id: string) {
    const retailShopTransactionsItems =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          retailShopTransaction: {
            retailShopId: id,
          },
        },
      });

    let overallProfit = 0;

    for (const retailShopTransactionItem of retailShopTransactionsItems) {
      const {
        quantity,
        sellingPrice,
        purchasePrice,
        transactionType,
        subTotal,
      } = retailShopTransactionItem;
      if (transactionType === TransactionType.SALE) {
        const profit = sellingPrice * quantity;
        overallProfit += subTotal;
      } else {
        const profit = purchasePrice * quantity;
        overallProfit -= subTotal;
      }
    }

    return overallProfit;
  }

  async totalProfitByDate(startDate: string, endDate: string) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const retailShopTransactionsItems =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          createdAt: {
            gte: formattedStartDate,
            lt: formattedEndDate,
          },
        },
      });

    let overallProfit = 0;

    for (const retailShopTransactionItem of retailShopTransactionsItems) {
      const {
        quantity,
        sellingPrice,
        purchasePrice,
        transactionType,
        subTotal,
      } = retailShopTransactionItem;
      if (transactionType === TransactionType.SALE) {
        const profit = sellingPrice * quantity;
        overallProfit += subTotal;
      } else {
        const profit = purchasePrice * quantity;
        overallProfit -= subTotal;
      }
    }
    return overallProfit;
  }

  async findOne(id: string) {
    return this.prisma.retailShopTransaction.findUnique({
      where: { id },
      include: retailShopTransactionInclude,
    });
  }

  async count(where?: Prisma.RetailShopTransactionWhereInput): Promise<number> {
    return this.prisma.retailShopTransaction.count({ where });
  }

  async totalProfitByProduct(id: string) {
    const retailShopTransactions =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          retailShopStock: {
            productId: id,
          },
        },
      });

    let overallProfit = 0;
    console.log(retailShopTransactions);
    for (const retailShopTransaction of retailShopTransactions) {
      const {
        quantity,
        sellingPrice,
        purchasePrice,
        transactionType,
        subTotal,
      } = retailShopTransaction;
      if (transactionType === TransactionType.SALE) {
        const profit = sellingPrice * quantity;
        overallProfit += subTotal;
      } else {
        const profit = purchasePrice * quantity;
        overallProfit -= subTotal;
      }
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
    where?: Prisma.RetailShopTransactionWhereInput;
    orderBy?: Prisma.RetailShopTransactionOrderByWithRelationInput;
  }) {
    return this.prisma.retailShopTransaction.findMany({
      where,
      include: retailShopTransactionInclude,
      skip,
      take,
      orderBy,
    });
  }

  async createRetailShopTransaction(
    userId: string,
    data: CreateBulkRetailShopTransactionInput,
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
          activePrice: true,
          product: true,
        },
      });

      if (retailShopStock.quantity < quantity) {
        throw new NotFoundException(
          retailShopStock.product.name + ' has no enough stock',
        );
      }

      if (!retailShopStock.activePrice) {
        throw new NotFoundException('Product has no active price');
      }
    }

    // update retail shop stock, and create the transaction
    await this.prisma.$transaction(async (tx) => {
      for (const good of goods) {
        const { productId, quantity } = good;
        const product = await tx.product.findUnique({
          where: { id: productId },
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
      const retailShopStock = await this.prisma.retailShopStock.findUnique({
        where: { id: good.productId },
        include: {
          activePrice: true,
        },
      });
      if (!retailShopStock.activePrice) {
        throw new NotFoundException('Product price not found');
      }
      if (!retailShopStock) {
        throw new NotFoundException('Product not found');
      }

      const subTotal = retailShopStock.activePrice.price * good.quantity;
      totalPrice += subTotal;
      return {
        ...good,
        subTotal: subTotal,
        sellingPrice: retailShopStock.activePrice.price,
        purchasePrice: retailShopStock.activePrice.purchasedPrice,
        retailShopStockId: retailShopStock.id,
      };
    });

    const goodsWithSubTotalResolved = await Promise.all(goodsWithSubTotal);

    const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();

    return await this.prisma.retailShopTransaction.create({
      data: {
        retailShopId: retailShopId,
        retailShopTransactionItems: {
          createMany: {
            data: goodsWithSubTotalResolved.map((item) => ({
              ...item,
              createdAt,
              sellingPrice: item.sellingPrice,
              purchasePrice: item.purchasePrice,
              transactionType: TransactionType.SALE,
            })),
          },
        },

        createdAt,
      },
      include: {
        retailShopTransactionItems: true,
      },
    });
  }

  async update(id: string, data: UpdateRetailShopTransactionInput) {
    const retailShopTransaction =
      await this.prisma.retailShopTransaction.findUnique({
        where: { id },
        include: {
          retailShop: true,
          retailShopTransactionItems: {
            include: {
              retailShopStock: {
                include: {
                  activePrice: true,
                },
              },
            },
          },

          // retailShopStock: {
          //   include: {
          //     activePrice: true,
          //   },
          // },
        },
      });
    if (!retailShopTransaction) {
      throw new NotFoundException('Sale transaction not found');
    }

    const createdAt = data.createdAt
      ? new Date(data.createdAt)
      : retailShopTransaction.createdAt;

    const { goods, retailShopId } = data;

    return await this.prisma.$transaction(async (tx) => {
      // decrease the stock of the retail shop with the previous goods
      for (const retailShopTransactionItem of retailShopTransaction.retailShopTransactionItems) {
        const { retailShopStockId, quantity } = retailShopTransactionItem;

        await tx.retailShopStock.update({
          where: {
            id: retailShopStockId,
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
              retailShopId: retailShopId ?? retailShopTransaction.retailShopId,
              productId: productId,
            },
          },
          include: {
            activePrice: true,
            product: true,
          },
        });

        if (retailShopStock.quantity < quantity) {
          throw new NotFoundException(
            retailShopStock.product.name + ' has no enough stock',
          );
        }

        if (!retailShopStock.activePrice) {
          throw new NotFoundException('Product has no active price');
        }

        // update the retail shop stock with the new goods, and create the transaction
        await tx.retailShopStock.update({
          where: {
            id: retailShopStock.id,
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
        const retailShopStock = await tx.retailShopStock.findUnique({
          where: { 
            productId_retailShopId: {
              retailShopId: retailShopId ?? retailShopTransaction.retailShopId,
              productId: good.productId,
            },
           },
          include: {
            activePrice: true,
          },
        });
        
        if (!retailShopStock) {
          throw new NotFoundException('Product not found');
        }
        if (!retailShopStock.activePrice) {
          throw new NotFoundException('Product has no active price');
        }

        if (retailShopStock.activePrice.purchasedPrice === null) {
          throw new NotFoundException('Product has no purchased price');
        }
        const subTotal = retailShopStock.activePrice.price * good.quantity;
        totalPrice += subTotal;
        return {
          ...good,
          subTotal: subTotal,
          sellingPrice: retailShopStock.activePrice.price,
          purchasePrice: retailShopStock.activePrice.purchasedPrice,
          transactionType: TransactionType.SALE,
        };
      });

      const goodsWithSubTotalResolved: any[] = await Promise.all(
        goodsWithSubTotal,
      );

      return await tx.retailShopTransaction.update({
        where: { id },
        data: {
          retailShop: {
            connect: {
              id: retailShopId ?? retailShopTransaction.retailShopId,
            },
          },
          retailShopTransactionItems: {
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
          retailShopTransactionItems: true,
        },
      });
    });
  }

  async remove(id: string) {
    const RetailShopTransaction =
      await this.prisma.retailShopTransaction.findUnique({
        where: { id },
      });
    if (!RetailShopTransaction) {
      throw new NotFoundException('Sale transaction not found');
    }

    return this.prisma.retailShopTransaction.delete({ where: { id } });
  }

  async restoreInTransaction(id: string) {
    const retailShopTransaction =
      await this.prisma.retailShopTransaction.findUnique({
        where: { id },
        include: {
          retailShopTransactionItems: true,
        },
      });
    if (!retailShopTransaction) {
      throw new NotFoundException('Sale transaction not found');
    }

    const createdAt = new Date();

    return await this.prisma.$transaction(async (tx) => {
      // decrease the stock of the retail shop with the previous goods
      for (const retailShopTransactionItem of retailShopTransaction.retailShopTransactionItems) {
        const { retailShopStockId, quantity } = retailShopTransactionItem;

        // check if the product exists
        const retailShopStock = await tx.retailShopStock.findUnique({
          where: {
            id: retailShopStockId,
          },
          include: {
            activePrice: true,
          },
        });
        if (!retailShopStock) {
          throw new NotFoundException('Product not found on retail shop');
        }

        await tx.retailShopStock.update({
          where: {
            id: retailShopStockId,
          },
          data: {
            quantity: {
              decrement: quantity,
            },
          },
        });
      }
      return await tx.retailShopTransaction.delete({
        where: { id },
      });
    });
  }

  // generate daily sells of a retail shop
  async dailySells(id: string, startDate: string, endDate: string) {
    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);

    // generate daily sells of a retail shop between two dates, group by the whole day transaction
    // const sells = await this.prisma.retailShopTransaction.groupBy({
    //   by: ['createdAt'],
    //   where: {
    //     retailShopId: id,
    //     createdAt: {
    //       gte: startDateFormatted,
    //       lt: endDateFormatted,
    //     },
    //   },
    //   _sum: {
    //     totalPrice: true,
    //   },
    //   _count: {
    //     id: true,
    //   },
    // });
    return 0;
  }

  async totalProfitByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const retailShopTransactionsItems =
      await this.prisma.retailShopTransactionItem.findMany({
        where: {
          retailShopStock: {
            productId: productId,
          },

          retailShopTransaction: {
            retailShopId: retailShopId,
          },
        },
        include: {
          retailShopStock: {
            include: {
              activePrice: true,
              product: true,
            },
          },
        },
      });

    let overallProfit = 0;

    for (const retailShopTransactionItem of retailShopTransactionsItems) {
      const {
        subTotal,
        quantity,
        retailShopStock,
        purchasePrice,
        sellingPrice,
        // product: {
        //   activePrice: { purchasedPrice },
        // },
      } = retailShopTransactionItem;
      const profit = subTotal - purchasePrice * quantity;
      overallProfit += profit;
    }

    return overallProfit;
  }

  async totalSalesByRetailShopAndProduct(
    retailShopId: string,
    productId: string,
  ) {
    const response = await this.prisma.retailShopTransactionItem.aggregate({
      where: {
        retailShopStock: {
          retailShopId: retailShopId,
          productId: productId,
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

  async totalTransactionsByRetailShopAndDate(
    retailShopId: string,
    startDate: string,
    endDate: string,
  ) {
    const [formattedStartDate, formattedEndDate] = [
      new Date(startDate),
      new Date(endDate),
    ];
    const response = await this.prisma.retailShopTransaction.aggregate({
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
    const response = await this.prisma.retailShopTransaction.aggregate({
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
