import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GoodsTransfersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.goodsTransfer.findMany({
      include: {
        destinationWarehouse: true,
        goods: true,
        retailShop: true,
        sourceWarehouse: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.goodsTransfer.findUnique({
      where: { id },
      include: {
        destinationWarehouse: true,
        goods: true,
        retailShop: true,
        sourceWarehouse: true,
      },
    });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.goodsTransfer.findMany({
      where: { sourceWarehouseId: warehouseId },
      include: {
        destinationWarehouse: true,
        goods: true,
        retailShop: true,
        sourceWarehouse: true,
      },
    });
  }

  async transferToRetailShop(data: CreateGoodsTransferInput) {
    const { goods, sourceWarehouseId, retailShopId } = data;

    // try {
    //   const promises = [];
    //   goods.map(async (good) => {
    //     // check if there is enough product in source warehouse
    //     const sourceWarehouseStock =
    //       await this.prisma.warehouseStock.findUnique({
    //         where: {
    //           productId_warehouseId: {
    //             productId: good.productId,
    //             warehouseId: sourceWarehouseId,
    //           },
    //         },
    //       });

    //     if (sourceWarehouseStock.quantity < good.quantity) {
    //       throw new Error(
    //         `${sourceWarehouseStock.id} doesn't have enough to quantity ${good.quantity}`,
    //       );
    //     }

    //     promises.push(
    //       this.prisma.warehouseStock.update({
    //         where: {
    //           productId_warehouseId: {
    //             productId: good.productId,
    //             warehouseId: sourceWarehouseId,
    //           },
    //         },
    //         data: {
    //           quantity: {
    //             decrement: good.quantity,
    //           },
    //         },
    //       }),
    //     );

    //     promises.push(
    //       this.prisma.retailShopStock.upsert({
    //         where: {
    //           productId_retailShopId: {
    //             retailShopId: retailShopId,
    //             productId: good.productId,
    //           },
    //         },
    //         create: {
    //           quantity: good.quantity,
    //           productId: good.productId,
    //           retailShopId: retailShopId,
    //           warehouseId: sourceWarehouseId,
    //         },
    //         update: {
    //           quantity: {
    //             increment: good.quantity,
    //           },
    //         },
    //       }),
    //     );
    //   });

    //   return await this.prisma
    //     .$transaction(promises)
    //     .then(async () => {
    //       return await this.prisma.goodsTransfer.create({
    //         data: {
    //           goods: {
    //             createMany: {
    //               data: goods,
    //               skipDuplicates: true,
    //             },
    //           },
    //           retailShop: {
    //             connect: {
    //               id: retailShopId,
    //             },
    //           },
    //           sourceWarehouse: {
    //             connect: {
    //               id: sourceWarehouseId,
    //             },
    //           },
    //         },
    //         include: {
    //           goods: {
    //             include: {
    //               product: true,
    //             },
    //           },
    //           retailShop: true,
    //           sourceWarehouse: true,
    //         },
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       return err;
    //     });
    // } catch (error) {
    //   return error;
    // }

    try {
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

            tx.retailShopStock.upsert({
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
              },
              update: {
                quantity: {
                  increment: good.quantity,
                },
              },
            });
          }
          return await tx.goodsTransfer.create({
            data: {
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
        },
        { maxWait: 20000, timeout: 20000 },
      );
    } catch (error) {
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

  async transferToWarehouse(data: CreateGoodsTransferInput) {
    const { goods, sourceWarehouseId, destinationWarehouseId } = data;

    // const promises = [];
    // for (const good of goods) {
    //   promises.push(
    //     this.prisma.warehouseStock.upsert({
    //       where: {
    //         productId_warehouseId: {
    //           productId: good.productId,
    //           warehouseId: destinationWarehouseId,
    //         },
    //       },
    //       create: {
    //         quantity: good.quantity,
    //         productId: good.productId,
    //         warehouseId: destinationWarehouseId,
    //       },
    //       update: {
    //         quantity: {
    //           increment: good.quantity,
    //         },
    //       },
    //     }),
    //   );

    //   promises.push(
    //     this.prisma.warehouseStock.update({
    //       where: {
    //         productId_warehouseId: {
    //           productId: good.productId,
    //           warehouseId: sourceWarehouseId,
    //         },
    //       },
    //       data: {
    //         quantity: {
    //           decrement: good.quantity,
    //         },
    //       },
    //     }),
    //   );
    // }

    // await this.prisma
    //   .$transaction(promises)
    //   .then(async () => {
    //     return await this.prisma.goodsTransfer.create({
    //       data: {
    //         goods: {
    //           createMany: {
    //             data: goods,
    //             skipDuplicates: true,
    //           },
    //         },
    //         sourceWarehouse: {
    //           connect: {
    //             id: sourceWarehouseId,
    //           },
    //         },
    //         destinationWarehouse: {
    //           connect: {
    //             id: destinationWarehouseId,
    //           },
    //         },
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });

    try {
      return await this.prisma.$transaction(async (tx) => {
        for (const good of goods) {
          const currentStock = await tx.warehouseStock.update({
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
            },
          });

          // 2. Verify that there's enough quantity.
          if (currentStock.quantity < 0) {
            throw new Error(
              `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
            );
          }

          tx.warehouseStock.update({
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
        }
        return await this.prisma.goodsTransfer.create({
          data: {
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
    } catch (error) {
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

    // const promises = [];
    // goods.map(async (good) => {
    //   promises.push(
    //     this.prisma.warehouseStock.update({
    //       where: {
    //         productId_warehouseId: {
    //           productId: good.productId,
    //           warehouseId: sourceWarehouseId,
    //         },
    //       },
    //       data: {
    //         quantity: {
    //           decrement: good.quantity,
    //         },
    //       },
    //     }),
    //   );

    //   promises.push(
    //     this.prisma.retailShopStock.upsert({
    //       where: {
    //         productId_retailShopId: {
    //           retailShopId: retailShopId,
    //           productId: good.productId,
    //         },
    //       },
    //       create: {
    //         quantity: good.quantity,
    //         productId: good.productId,
    //         retailShopId: retailShopId,
    //         warehouseId: sourceWarehouseId,
    //       },
    //       update: {
    //         quantity: {
    //           increment: good.quantity,
    //         },
    //       },
    //     }),
    //   );
    // });

    // this.prisma
    //   .$transaction(promises)
    //   .then(async () => {
    //     return await this.prisma.goodsTransfer.update({
    //       where: { id },
    //       data: {
    //         goods: {
    //           createMany: {
    //             data: goods,
    //             skipDuplicates: true,
    //           },
    //         },
    //         retailShop: {
    //           connect: {
    //             id: retailShopId,
    //           },
    //         },
    //         sourceWarehouse: {
    //           connect: {
    //             id: sourceWarehouseId,
    //           },
    //         },
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });

    try {
      return await this.prisma.$transaction(async (tx) => {
        for (const good of goods) {
          const currentStock = await this.prisma.warehouseStock.update({
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

          await this.prisma.retailShopStock.upsert({
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
            },
            update: {
              quantity: {
                increment: good.quantity,
              },
              maxQuantity: {
                increment: good.quantity,
              },
            },
          });
        }
      });
    } catch (error) {
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

  async updateTransferToWarehouse(id: string, data: UpdateGoodsTransferInput) {
    const { goods, sourceWarehouseId, destinationWarehouseId } = data;

    // const promises = [];
    // goods.map(async (good) => {
    //   promises.push(
    //     this.prisma.warehouseStock.upsert({
    //       where: {
    //         productId_warehouseId: {
    //           productId: good.productId,
    //           warehouseId: destinationWarehouseId,
    //         },
    //       },
    //       create: {
    //         quantity: good.quantity,
    //         productId: good.productId,
    //         warehouseId: destinationWarehouseId,
    //       },
    //       update: {
    //         quantity: {
    //           increment: good.quantity,
    //         },
    //       },
    //     }),
    //   );

    //   promises.push(
    //     this.prisma.warehouseStock.update({
    //       where: {
    //         productId_warehouseId: {
    //           productId: good.productId,
    //           warehouseId: sourceWarehouseId,
    //         },
    //       },
    //       data: {
    //         quantity: {
    //           decrement: good.quantity,
    //         },
    //       },
    //     }),
    //   );
    // });

    // this.prisma
    //   .$transaction(promises)
    //   .then(async () => {
    //     return await this.prisma.goodsTransfer.update({
    //       where: { id },
    //       data: {
    //         goods: {
    //           createMany: {
    //             data: goods,
    //             skipDuplicates: true,
    //           },
    //         },
    //         sourceWarehouse: {
    //           connect: {
    //             id: sourceWarehouseId,
    //           },
    //         },
    //         destinationWarehouse: {
    //           connect: {
    //             id: destinationWarehouseId,
    //           },
    //         },
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     return err;
    //   });

    try {
      return await this.prisma.$transaction(async (tx) => {
        for (const good of goods) {
          const currentStock = await this.prisma.warehouseStock.update({
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
            },
          });

          // 2. Verify that there's enough quantity.
          if (currentStock.quantity < 0) {
            throw new Error(
              `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
            );
          }

          await this.prisma.warehouseStock.update({
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
        }
      });
    } catch (error) {
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

  async remove(id: string) {
    return this.prisma.goodsTransfer.delete({ where: { id } });
  }
}
