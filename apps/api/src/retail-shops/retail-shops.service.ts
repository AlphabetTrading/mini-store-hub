import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRetailShopInput } from './dto/create-retail-shop.input';
import { UpdateRetailShopInput } from './dto/update-retail-shop.input';
import { RetailShop } from './models/retail-shop.model';
import { Prisma } from '@prisma/client';

const retailShopInclude: Prisma.RetailShopInclude = {
  address: true,
  dailyTransaction: true,
  monthlyTransaction: true,
  annualTransaction: true,
  goodsTransfersAsDestination: true,
  retailShopManager: true,
  retailShopStock: {
    include: {
      product: true,
      retailShop: true,
      warehouse: true,
    },
  },
  retailShopTransactions: true,
  // saleTransaction: true,
};

@Injectable()
export class RetailShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.RetailShopWhereInput;
    orderBy?: Prisma.RetailShopOrderByWithRelationInput;
  }): Promise<RetailShop[]> {
    return this.prisma.retailShop.findMany({
      skip,
      take,
      where,
      orderBy,
      include: retailShopInclude,
    });
  }

  async findOne(id: string) {
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    return this.prisma.retailShop.findUnique({
      where: { id },
      include: retailShopInclude,
    });
  }

  async count(where?: Prisma.RetailShopWhereInput): Promise<number> {
    return this.prisma.retailShop.count({ where });
  }

  async findByAddress(address: string) {
    return this.prisma.retailShop.findMany({
      where: {
        address: {
          street: {
            contains: address,
          },
        },
      },
      include: retailShopInclude,
    });
  }

  async create(data: CreateRetailShopInput): Promise<any> {
    return this.prisma.retailShop.create({
      data: {
        name: data.name,
        amharicName: data.amharicName,
        retailShopManager: data.retailShopManagerId && {
          connect: {
            id: data.retailShopManagerId,
          },
        },
        address: {
          create: {
            ...data.address,
          },
        },
      },
    });
  }

  async update(id: string, data: UpdateRetailShopInput) {
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    return this.prisma.retailShop.update({
      where: { id },
      data: {
        name: data.name,
        amharicName: data.amharicName,
        address: {
          upsert: {
            create: {
              ...data.address,
            },
            update: {
              ...data.address,
            },
          },
        },
        retailShopManager: data.retailShopManagerId && {
          connect: {
            id: data.retailShopManagerId,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    return this.prisma.retailShop.delete({ where: { id } });
  }

  async deactivate(id: string) {
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    return this.prisma.retailShop.update({
      where: { id },
      data: {
        status: false,
      },
    });
  }

  async activate(id: string) {
    const retailShop = await this.prisma.retailShop.findUnique({
      where: { id },
    });

    if (!retailShop) {
      throw new Error('Retail shop not found');
    }

    return this.prisma.retailShop.update({
      where: { id },
      data: {
        status: true,
      },
    });
  }
}
