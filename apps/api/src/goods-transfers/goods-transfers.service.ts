import { Injectable } from '@nestjs/common';
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

  async create(data: CreateGoodsTransferInput) {
    return this.prisma.goodsTransfer.create({ data });
  }

  async update(id: string, data: UpdateGoodsTransferInput) {
    return this.prisma.goodsTransfer.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.goodsTransfer.delete({ where: { id } });
  }
}
