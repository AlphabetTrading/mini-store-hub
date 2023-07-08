import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleTransactionInput } from './dto/create-sale-transaction.input';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';

@Injectable()
export class SaleTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.saleTransaction.findMany();
  }

  async findOne(id: string) {
    return this.prisma.saleTransaction.findUnique({ where: { id } });
  }

  async findAllByRetailShop(id: string) {
    return this.prisma.saleTransaction.findMany({
      where: { retailShopId: id },
    });
  }

  async create(data: CreateSaleTransactionInput) {
    return this.prisma.saleTransaction.create({ data });
  }

  async update(id: string, data: UpdateSaleTransactionInput) {
    return this.prisma.saleTransaction.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.saleTransaction.delete({ where: { id } });
  }
}
