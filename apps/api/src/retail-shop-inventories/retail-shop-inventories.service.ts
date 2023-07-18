import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRetailShopStockInput } from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';
import { Prisma, RetailShopStock } from '@prisma/client';

const retailShopStockInclude = {
  product: true,
  warehouse: true,
  retailShop: true,
};

@Injectable()
export class RetailShopStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.retailShopStock.findMany({
      include: {
        product: true,
        retailShop: true,
        warehouse: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.retailShopStock.findUnique({
      where: { id },
      include: retailShopStockInclude,
    });
  }

  async count(where: Prisma.RetailShopStockWhereInput) {
    return this.prisma.retailShopStock.count({ where });
  }

  async findByProductId(productId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { productId },
      include: retailShopStockInclude,
    });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { warehouseId },
      include: retailShopStockInclude,
    });
  }

  async findByRetailShopId({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.RetailShopStockWhereInput;
    orderBy?: Prisma.RetailShopStockOrderByWithRelationInput;
  }): Promise<RetailShopStock[]> {
    return this.prisma.retailShopStock.findMany({
      skip,
      take,
      where,
      orderBy,
      include: retailShopStockInclude,
    });
  }

  async findByRetailShopIdAndProductId(
    retailShopId: string,
    productId: string,
  ) {
    return this.prisma.retailShopStock.findUnique({
      where: { productId_retailShopId: { productId, retailShopId } },
      include: retailShopStockInclude,
    });
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { productId, warehouseId },
      include: retailShopStockInclude,
    });
  }

  async create(data: CreateRetailShopStockInput) {
    return this.prisma.retailShopStock.create({
      data: {
        maxQuantity: data.quantity,
        ...data,
      },
    });
  }

  async update(id: string, data: UpdateRetailShopStockInput) {
    return this.prisma.retailShopStock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.retailShopStock.delete({ where: { id } });
  }
}
