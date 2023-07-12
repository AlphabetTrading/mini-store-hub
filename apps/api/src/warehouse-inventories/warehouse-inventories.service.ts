import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateWarehouseStockInput } from './dto/update-warehouse-inventory.input';
import { CreateWarehouseStockInput } from './dto/create-warehouse-inventory.input';

@Injectable()
export class WarehouseStockService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.warehouseStock.findMany();
  }

  async findOne(id: string) {
    return this.prisma.warehouseStock.findUnique({ where: { id } });
  }

  async findByWarehouseId(warehouseId: string) {
    return this.prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: { warehouse: true },
    });
  }

  async create(data: CreateWarehouseStockInput) {
    return this.prisma.warehouseStock.create({ data });
  }

  async update(id: string, data: UpdateWarehouseStockInput) {
    return this.prisma.warehouseStock.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.warehouseStock.delete({ where: { id } });
  }
}
