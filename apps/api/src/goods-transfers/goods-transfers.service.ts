import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoodsTransfer } from './models/goods-transfer.model';
import { Prisma, TransactionType } from '@prisma/client';
import { CreateGoodsTransferFromMainWarehouseInput } from './dto/create-goods-transfer-from-main.input';

const goodsTransferInclude: Prisma.GoodsTransferInclude = {
  destinationWarehouse: true,
  goods: {
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  },
  retailShop: true,
  sourceWarehouse: true,
};

@Injectable()
export class GoodsTransfersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.GoodsTransferWhereInput;
    orderBy?: Prisma.GoodsTransferOrderByWithRelationInput;
  }) {
    return this.prisma.goodsTransfer.findMany({
      skip,
      take,
      where,
      orderBy,
      include: goodsTransferInclude,
    });
  }

  async findOne(id: string) {
    const goodsTransfer = await this.prisma.goodsTransfer.findUnique({
      where: { id },
      include: goodsTransferInclude,
    });

    if (!goodsTransfer) {
      throw new BadRequestException(
        "Goods transfer with the provided ID doesn't exist",
      );
    }
    return goodsTransfer;
  }

  async count(where?: Prisma.GoodsTransferWhereInput): Promise<number> {
    return this.prisma.goodsTransfer.count({ where });
  }

  async findByWarehouseId({
    where,
    orderBy,
    skip,
    take,
  }: {
    where: Prisma.GoodsTransferWhereInput;
    orderBy?: Prisma.GoodsTransferOrderByWithRelationInput;
    skip?: number;
    take?: number;
  }) {
    return this.prisma.goodsTransfer.findMany({
      where,
      orderBy,
      skip,
      take,
      include: goodsTransferInclude,
    });
  }

  async transferToRetailShop(data: CreateGoodsTransferInput) {
    const { goods, sourceWarehouseId, retailShopId } = data;

    const retailShop = await this.prisma.retailShop.findUnique({
      where: {
        id: retailShopId,
      },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    const sourceWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: sourceWarehouseId,
      },
    });

    if (!sourceWarehouse) {
      throw new Error('Source warehouse not found');
    }

    return await this.prisma.$transaction(
      async (tx) => {
        for (const good of goods) {
          const currentStock = await tx.warehouseStock.update({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId: sourceWarehouseId,
              },
            },
            data: {
              quantity: {
                decrement: good.quantity,
              },
            },
          });

          // 2. Verify that there's enough quantity.
          if (currentStock.quantity < 0) {
            throw new Error(
              `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
            );
          }

          await tx.retailShopStock.upsert({
            where: {
              productId_retailShopId: {
                retailShopId: retailShopId,
                productId: good.productId,
              },
            },
            create: {
              quantity: good.quantity,
              productId: good.productId,
              retailShopId: retailShopId,
              warehouseId: sourceWarehouseId,
              maxQuantity: good.quantity,
              
              retailShopTransactionItems:{
                create:{
                  quantity: good.quantity,
                  transactionType: TransactionType.PURCHASE,
                  purchasePrice: 20,
                  sellingPrice: 30,
                  subTotal: 30 * good.quantity,
                  retailShopTransactionId: '1',

                }
              }
            },
            update: {
              quantity: {
                increment: good.quantity,
              },
            },
          });
        }

        const transfers =  await tx.goodsTransfer.create({
          data: {
            transferType: data.transferType,
            goods: {
              createMany: {
                data: goods,
                skipDuplicates: true,
              },
            },
            retailShop: {
              connect: {
                id: retailShopId,
              },
            },
            sourceWarehouse: {
              connect: {
                id: sourceWarehouseId,
              },
            },
          },
          include: {
            goods: {
              include: {
                product: true,
              },
            },
            retailShop: true,
            sourceWarehouse: true,
          },
        });

        const retailShopInputTransactions = []
        await goods.map(async(good) => {
          const retailShopStock = await tx.retailShopStock.findUnique({
            where: {
              productId_retailShopId: {
                productId: good.productId,
                retailShopId: retailShopId,
              },
            },
          });

          retailShopInputTransactions.push({
            quantity: good.quantity,
            productId: good.productId,
            transactionType: TransactionType.PURCHASE,
            purchasePrice: good.purchasePrice,
            sellingPrice: good.sellingPrice,
            subTotal: good.purchasePrice * good.quantity,
            retailShopStockId: retailShopStock.id,
          })
        });

         // create retail shop transaction 
         await tx.retailShopTransaction.create({
          data: {
            retailShopId,
            retailShopTransactionItems: {
              createMany: {
                data: retailShopInputTransactions,
              }
            }
          },
        });

        return transfers
      },
      { maxWait: 20000, timeout: 20000 },
    );
  }

  async transferToWarehouse(data: CreateGoodsTransferInput) {
    const { goods, sourceWarehouseId, destinationWarehouseId } = data;

    const sourceWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: sourceWarehouseId,
      },
    });

    if (!sourceWarehouse) {
      throw new Error('Source warehouse not found');
    }

    const destinationWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: destinationWarehouseId,
      },
    });

    if (!destinationWarehouse) {
      throw new Error('Destination warehouse not found');
    }

    // try {
    return await this.prisma.$transaction(async (tx) => {
      for (const good of goods) {
        const currentStock = await tx.warehouseStock.update({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId: sourceWarehouseId,
            },
          },
          data: {
            quantity: {
              decrement: good.quantity,
            },
          },
        });

        // 2. Verify that there's enough quantity.
        if (currentStock.quantity < 0) {
          throw new Error(
            `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
          );
        }

        const destinationStock = await tx.warehouseStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId: destinationWarehouseId,
            },
          },
        });

        if (destinationStock) {
          await tx.warehouseStock.update({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId: destinationWarehouseId,
              },
            },
            data: {
              quantity: {
                increment: good.quantity,
              },
              maxQuantity: destinationStock.quantity + good.quantity,
            },
          });
        } else {
          await tx.warehouseStock.create({
            data: {
              quantity: good.quantity,
              productId: good.productId,
              warehouseId: destinationWarehouseId,
              maxQuantity: good.quantity,
            },
          });
        }
      }

      return await this.prisma.goodsTransfer.create({
        data: {
          transferType: data.transferType,
          goods: {
            createMany: {
              data: goods,
              skipDuplicates: true,
            },
          },
          sourceWarehouse: {
            connect: {
              id: sourceWarehouseId,
            },
          },
          destinationWarehouse: {
            connect: {
              id: destinationWarehouseId,
            },
          },
        },
      });
    });
    // } catch (error) {
    //   this.prisma.$disconnect();
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'You are forbidden to access the endpoint',
    //     },
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: error,
    //     },
    //   );
    // }
  }

  // transfer goods from main warehouse to warehouse, and the main warehouse has an infinite amount of goods, so that the quantity of goods in the main warehouse is not reduced

  async transferToWarehouseFromMainWarehouse(
    data: CreateGoodsTransferFromMainWarehouseInput,
  ): Promise<GoodsTransfer> {
    const { goods, destinationWarehouseId } = data;
    const sourceWarehouse = await this.prisma.warehouse.findFirst({
      where: {
        isMain: true,
      },
    });

    if (!sourceWarehouse) {
      throw new Error('Main warehouse not found');
    }

    const destinationWarehouse = await this.prisma.warehouse.findUnique({
      where: {
        id: destinationWarehouseId,
      },
    });

    if (!destinationWarehouse) {
      throw new Error('Destination warehouse not found');
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        for (const good of goods) {
          const currentStock = await tx.warehouseStock.findUnique({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId: destinationWarehouseId,
              },
            },
          });

          if (!currentStock) {
            await tx.warehouseStock.create({
              data: {
                quantity: good.quantity,
                productId: good.productId,
                warehouseId: destinationWarehouseId,
                maxQuantity: good.quantity,
              },
            });
          } else {
            await tx.warehouseStock.update({
              where: {
                productId_warehouseId: {
                  productId: good.productId,
                  warehouseId: destinationWarehouseId,
                },
              },
              data: {
                quantity: {
                  increment: good.quantity,
                },
                maxQuantity: currentStock.quantity + good.quantity,
              },
            });
          }
        }

        // create goods transfer in main warehouse
        return await tx.goodsTransfer.create({
          data: {
            goods: {
              createMany: {
                data: goods,
                skipDuplicates: true,
              },
            },
            sourceWarehouse: {
              connect: {
                id: sourceWarehouse.id,
              },
            },
            destinationWarehouse: {
              connect: {
                id: destinationWarehouseId,
              },
            },
          },
        });
      });
    } catch (error) {
      console.log(error);
      this.prisma.$disconnect();
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'You are forbidden to access the endpoint',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async updateTransferToRetailShop(id: string, data: UpdateGoodsTransferInput) {
    const { goods, sourceWarehouseId, retailShopId } = data;

    const goodsTransfer = await this.prisma.goodsTransfer.findUnique({
      where: {
        id,
      },
      include: {
        goods: true,
      },
    });

    if (!goodsTransfer) {
      throw new Error('Goods transfer not found');
    }

    if (retailShopId) {
      const retailShop = await this.prisma.retailShop.findUnique({
        where: {
          id: retailShopId,
        },
      });

      if (!retailShop) {
        throw new Error('Retail shop not found');
      }
    }

    if (sourceWarehouseId) {
      const sourceWarehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: sourceWarehouseId,
        },
      });

      if (!sourceWarehouse) {
        throw new Error('Source warehouse not found');
      }
    }

    // delete goods from retail shop
    return await this.prisma.$transaction(async (tx) => {
      for (const good of goodsTransfer.goods) {
        const stock = await tx.retailShopStock.findUnique({
          where: {
            productId_retailShopId: {
              productId: good.productId,
              retailShopId: goodsTransfer.retailShopId,
            },
          },
        });

        if (!stock) {
          throw new Error('Stock not found');
        }

        const currentStock = await tx.retailShopStock.update({
          where: {
            productId_retailShopId: {
              productId: good.productId,
              retailShopId: goodsTransfer.retailShopId,
            },
          },
          data: {
            quantity: {
              decrement: good.quantity,
            },
          },
        });

        // increase the warehouse stock

        await tx.warehouseStock.update({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId: goodsTransfer.sourceWarehouseId,
            },
          },
          data: {
            quantity: {
              increment: good.quantity,
            },
          },
        });
      }

      for (const good of goods) {
        const productExist = await tx.product.findUnique({
          where: {
            id: good.productId,
          },
        });

        if (!productExist) {
          throw new Error('Product not found');
        }

        const currentWarehouseStock = await tx.warehouseStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId: sourceWarehouseId ?? goodsTransfer.sourceWarehouseId,
            },
          },
        });

        if (!currentWarehouseStock) {
          throw new Error('Stock not found');
        }

        const currentStock = await tx.warehouseStock.update({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId: sourceWarehouseId ?? goodsTransfer.sourceWarehouseId,
            },
          },
          data: {
            quantity: {
              decrement: good.quantity,
            },
          },
        });

        // 2. Verify that there's enough quantity.
        if (currentStock.quantity < 0) {
          throw new Error(
            `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
          );
        }

        const retailShopStock = await tx.retailShopStock.findUnique({
          where: {
            productId_retailShopId: {
              productId: good.productId,
              retailShopId: retailShopId ?? goodsTransfer.retailShopId,
            },
          },
        });

        if (!retailShopStock) {
          // create new stock if not exist
          await tx.retailShopStock.create({
            data: {
              quantity: good.quantity,
              productId: good.productId,
              retailShopId: retailShopId ?? goodsTransfer.retailShopId,
              warehouseId: sourceWarehouseId ?? goodsTransfer.sourceWarehouseId,
              maxQuantity: good.quantity,
            },
          });
        } else {
          // update stock
          await tx.retailShopStock.update({
            where: {
              productId_retailShopId: {
                productId: good.productId,
                retailShopId: retailShopId ?? goodsTransfer.retailShopId,
              },
            },
            data: {
              quantity: {
                increment: good.quantity,
              },
              maxQuantity: retailShopStock.quantity + good.quantity,
            },
          });
        }
      }

      return await tx.goodsTransfer.update({
        where: { id },
        data: {
          goods: {
            deleteMany: {
              productId: {
                in: goodsTransfer.goods.map((good) => good.productId),
              },
            },
            createMany: {
              data: goods,
              skipDuplicates: true,
            },
          },
          retailShop: {
            connect: {
              id: retailShopId ?? goodsTransfer.retailShopId,
            },
          },
          sourceWarehouse: {
            connect: {
              id: sourceWarehouseId ?? goodsTransfer.sourceWarehouseId,
            },
          },
        },
        include: goodsTransferInclude,
      });
    });
  }

  async updateTransferToWarehouse(id: string, data: UpdateGoodsTransferInput) {
    const { goods, sourceWarehouseId, destinationWarehouseId } = data;

    if (destinationWarehouseId) {
      const destinationWarehouse = await this.prisma.warehouse.findUnique({
        where: {
          id: destinationWarehouseId,
        },
      });

      if (!destinationWarehouse) {
        throw new Error('Destination warehouse not found');
      }
    }

    // get goods transfer
    const goodsTransfer = await this.prisma.goodsTransfer.findUnique({
      where: {
        id,
      },
      include: {
        goods: true,
      },
    });

    if (!goodsTransfer) {
      throw new Error('Goods transfer not found');
    }

    // decrement quantity of goods in destination warehouse
    return await this.prisma.$transaction(async (tx) => {
      for (const good of goodsTransfer.goods) {
        const stock = await tx.warehouseStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
            },
          },
        });

        if (!stock) {
          throw new Error('Stock not found');
        }

        const currentStock = await tx.warehouseStock.update({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
            },
          },
          data: {
            quantity: {
              decrement: good.quantity,
            },
          },
        });
      }

      for (const good of goods) {
        const productExist = await tx.product.findUnique({
          where: {
            id: good.productId,
          },
        });

        if (!productExist) {
          throw new Error('Product not found');
        }

        const currentStock = await tx.warehouseStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
            },
          },
        });

        if (!currentStock) {
          // create new stock if not exist
          await tx.warehouseStock.create({
            data: {
              quantity: good.quantity,
              productId: good.productId,
              warehouseId:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
              maxQuantity: good.quantity,
            },
          });
        } else {
          // update stock
          await tx.warehouseStock.update({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId:
                  destinationWarehouseId ??
                  goodsTransfer.destinationWarehouseId,
              },
            },
            data: {
              quantity: {
                increment: good.quantity,
              },
              maxQuantity: currentStock.quantity + good.quantity,
            },
          });
        }
      }

      for (const good of [...goods, ...goodsTransfer.goods]) {
        const currentStock = await tx.warehouseStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: good.productId,
              warehouseId:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
            },
          },
        });

        console.log(currentStock, '----');

        // 2. Verify that there's enough quantity.
        if (currentStock.quantity < 0) {
          throw new Error(
            `Product with ${currentStock.productId} ID doesn't have enough quantity to update ${good.quantity}`,
          );
        }
      }

      return await tx.goodsTransfer.update({
        where: { id },
        data: {
          goods: {
            deleteMany: {
              productId: {
                in: goodsTransfer.goods.map((good) => good.productId),
              },
            },
            createMany: {
              data: goods,
              skipDuplicates: true,
            },
          },
          sourceWarehouse: {
            connect: {
              id: sourceWarehouseId ?? goodsTransfer.sourceWarehouseId,
            },
          },
          destinationWarehouse: {
            connect: {
              id:
                destinationWarehouseId ?? goodsTransfer.destinationWarehouseId,
            },
          },
        },
        include: goodsTransferInclude,
      });
    });
  }

  async remove(id: string) {
    const goodsTransfer = await this.prisma.goodsTransfer.findUnique({
      where: { id },
    });

    if (!goodsTransfer) {
      throw new BadRequestException(
        "Goods transfer with the provided ID doesn't exist",
      );
    }

    return this.prisma.goodsTransfer.delete({
      where: { id },
      include: goodsTransferInclude,
    });
  }
}
