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
  saleTransaction: true,
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
      data,
    });
  }

  async update(id: string, data: UpdateRetailShopInput) {
    return this.prisma.retailShop.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.retailShop.delete({ where: { id } });
  }
}
