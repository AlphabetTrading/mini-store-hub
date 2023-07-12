import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRetailShopStockInput } from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';

@Injectable()
export class RetailShopStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.retailShopStock.findMany();
  }

  async findOne(id: string) {
    return this.prisma.retailShopStock.findUnique({ where: { id } });
  }

  async findByProductId(productId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { productId },
      include: { product: true, warehouse: true },
    });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { warehouseId },
      include: { product: true, warehouse: true },
    });
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    return this.prisma.retailShopStock.findMany({
      where: { productId, warehouseId },
      include: { product: true, warehouse: true },
    });
  }

  async create(data: CreateRetailShopStockInput) {
    return this.prisma.retailShopStock.create({ data });
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
