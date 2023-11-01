import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';
import { Prisma } from '@prisma/client';
import { Warehouse } from './models/warehouse.model';
import { PrismaService } from 'src/prisma/prisma.service';

const warehouseInclude: Prisma.WarehouseInclude = {
  warehouseManager: true,
  address: true,
  warehouseStock: {
    include: {
      product: true,
    },
  },
  goodsTransfersAsDestination: true,
  goodsTransfersAsSource: true,
};

@Injectable()
export class WarehousesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.WarehouseWhereInput;
    orderBy?: Prisma.WarehouseOrderByWithRelationInput;
  }): Promise<Warehouse[]> {
    return await this.prisma.warehouse.findMany({
      skip,
      take,
      where: {
        ...where,
        isMain: false,
      },
      orderBy,
      include: warehouseInclude,
    });
  }

  async findOne(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      throw new Error('Warehouse not found');
    }

    return await this.prisma.warehouse.findUnique({
      where: { id },
      include: warehouseInclude,
    });
  }

  async count(where?: Prisma.WarehouseWhereInput): Promise<number> {
    return this.prisma.warehouse.count({ where });
  }

  async findByWarehouseManager(id: string) {
    const warehouse = await this.prisma.warehouse.findFirst({
      where: { warehouseManagerId: id, isMain: false },
    });

    if (!warehouse) {
      throw new Error('Warehouse not found');
    }
    return await this.prisma.warehouse.findMany({
      where: { warehouseManagerId: id, isMain: false },
      include: warehouseInclude,
    });
  }

  async findByAddress(address: string) {
    return await this.prisma.warehouse.findMany({
      where: {
        address: {
          street: address,
        },
        isMain: false,
      },
      include: warehouseInclude,
    });
  }

  async create(data: CreateWarehouseInput) {
    return await this.prisma.warehouse.create({
      data: {
        name: data.name,
        amharicName: data.amharicName,
        warehouseManager: data.warehouseManagerId && {
          connect: {
            id: data.warehouseManagerId,
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

  async update(id: string, data: UpdateWarehouseInput) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return await this.prisma.warehouse.update({
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
        warehouseManager: data.warehouseManagerId && {
          connect: {
            id: data.warehouseManagerId,
          },
        },
      },
    });
  }

  async deactivate(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return await this.prisma.warehouse.update({
      where: { id },
      data: {
        status: false,
      },
    });
  }
  async activate(id: string) {
    const warehouse = this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return await this.prisma.warehouse.update({
      where: { id },
      data: {
        status: true,
      },
    });
  }

  async remove(id: string) {
    const warehouse = await this.prisma.warehouse.findUnique({
      where: { id },
    });

    if (!warehouse) {
      throw new NotFoundException('Warehouse not found');
    }

    return await this.prisma.warehouse.delete({
      where: { id },
    });
  }
}
