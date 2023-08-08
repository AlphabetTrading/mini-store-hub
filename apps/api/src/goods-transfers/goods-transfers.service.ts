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
import { Prisma } from '@prisma/client';
import { CreateGoodsTransferFromMainWarehouseInput } from './dto/create-goods-transfer-from-main.input';

const goodsTransferInclude = {
  destinationWarehouse: true,
  goods: true,
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
  }): Promise<GoodsTransfer[]> {
    return this.prisma.goodsTransfer.findMany({
      skip,
      take,
      where,
      orderBy,

      include: {
        destinationWarehouse: true,
        goods: true,
        retailShop: true,
        sourceWarehouse: true,
      },
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

          await tx.warehouseStock.upsert({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId: sourceWarehouseId,
              },
            },
            create: {
              quantity: good.quantity,
              productId: good.productId,
              warehouseId: sourceWarehouseId,
            },
            update: {
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
          await tx.warehouseStock.upsert({
            where: {
              productId_warehouseId: {
                productId: good.productId,
                warehouseId: destinationWarehouseId,
              },
            },
            create: {
              quantity: good.quantity,
              productId: good.productId,
              warehouseId: destinationWarehouseId,
            },
            update: {
              quantity: {
                increment: good.quantity,
              },
            },
          });
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

// try {
//   return await this.prisma.$transaction(async (tx) => {
//     for (const good of goods) {
//       const currentStock = await tx.warehouseStock.update({
//         where: {
//           productId_warehouseId: {
//             productId: good.productId,
//             warehouseId: destinationWarehouseId,
//           },
//         },
//         data: {
//           quantity: {
//             increment: good.quantity,
//           },
//         },
//       });

//       // 2. Verify that there's enough quantity.
//       if (currentStock.quantity < 0) {
//         throw new Error(
//           `Product with ${currentStock.productId} ID doesn't have enough quantity to transfer ${good.quantity}`,
//         );
//       }

//       await tx.warehouseStock.update({
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
//       });
//     }
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
//   });
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
