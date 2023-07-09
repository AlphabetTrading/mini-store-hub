import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProductInventoryInput } from './dto/update-product.input';
import { CreateProductInventoryInput } from './dto/create-product-inventory.input';

@Injectable()
export class ProductInventoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productInventory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.productInventory.findUnique({ where: { id } });
  }

  async findByProductId(productId: string) {
    return this.prisma.productInventory.findMany({
      where: { productId },
      include: { product: true, warehouse: true, GoodsTransfer: true },
    });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.productInventory.findMany({
      where: { warehouseId },
      include: { product: true, warehouse: true, GoodsTransfer: true },
    });
  }

  async findByProductIdAndWarehouseId(productId: string, warehouseId: string) {
    return this.prisma.productInventory.findMany({
      where: { productId, warehouseId },
      include: { product: true, warehouse: true, GoodsTransfer: true },
    });
  }

  async create(data: CreateProductInventoryInput) {
    return this.prisma.productInventory.create({ data });
  }

  async update(id: string, data: UpdateProductInventoryInput) {
    return this.prisma.productInventory.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.productInventory.delete({ where: { id } });
  }
}
