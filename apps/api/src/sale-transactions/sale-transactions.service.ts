import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleTransactionInput } from './dto/create-sale-transaction.input';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';

@Injectable()
export class SaleTransactionsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.saleTransaction.findMany({
      include: {
        retailShop: true,
        product: {
          include: {
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            warehouseStock: true,
            category: true,
          },
        },
      },
    });
  }
  async findOne(id: string) {
    return this.prisma.saleTransaction.findUnique({
      where: { id },
      include: {
        retailShop: true,
        product: {
          include: {
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            warehouseStock: true,
            category: true,
          },
        },
      },
    });
  }
  async findAllByRetailShop(id: string) {
    return this.prisma.saleTransaction.findMany({
      where: { retailShopId: id },
      include: {
        retailShop: true,
        product: {
          include: {
            activePrice: true,
            priceHistory: true,
            retailShopStock: true,
            warehouseStock: true,
            category: true,
          },
        },
      },
    });
  }
  async create(data: CreateSaleTransactionInput) {
    return this.prisma.saleTransaction.create({ data });
  }
  async getTotal() {
    const response = await this.prisma.saleTransaction.aggregate({
      _sum: {
        price: true,
        quantity: true,
      },
    });
    const total = response._sum.price;
    return total;
  }
  async update(id: string, data: UpdateSaleTransactionInput) {
    return this.prisma.saleTransaction.update({ where: { id }, data });
  }
  async remove(id: string) {
    return this.prisma.saleTransaction.delete({ where: { id } });
  }
  // generate daily sells of a retail shop
  async dailySells(id: string, startDate: string, endDate: string) {
    const startDateFormatted = new Date(startDate);
    const endDateFormatted = new Date(endDate);
    //  const dateString = date.toISOString().split('T')[0];
  }
}
