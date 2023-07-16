import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.warehouse.findMany({
      include: {
        warehouseManager: true,
        address: true,
        warehouseStock: {
          include: {
            product: true,
          },
        },
        goodsTransfersAsDestination: true,
        goodsTransfersAsSource: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.warehouse.findUnique({
      where: { id },
      include: {
        warehouseManager: true,
        address: true,
        warehouseStock: true,
        goodsTransfersAsDestination: true,
        goodsTransfersAsSource: true,
      },
    });
  }

  async findByWarehouseManager(id: string) {
    return await this.prisma.warehouse.findMany({
      where: { warehouseManagerId: id },
      include: {
        warehouseManager: true,
        address: true,
        warehouseStock: true,
        goodsTransfersAsDestination: true,
        goodsTransfersAsSource: true,
      },
    });
  }

  async findByAddress(address: string) {
    return await this.prisma.warehouse.findMany({
      where: {
        address: {
          street: address,
        },
      },
      include: {
        warehouseManager: true,
        address: true,
        warehouseStock: true,
        goodsTransfersAsDestination: true,
        goodsTransfersAsSource: true,
      },
    });
  }

  async create(data: CreateWarehouseInput) {
    return await this.prisma.warehouse.create({ data });
  }

  async update(id: string, data: UpdateWarehouseInput) {
    return await this.prisma.warehouse.update({
      where: { id },
      data: {
        name: data.name,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.warehouse.delete({
      where: { id },
    });
  }
}
