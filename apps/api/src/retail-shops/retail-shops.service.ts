import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRetailShopInput } from './dto/create-retail-shop.input';
import { UpdateRetailShopInput } from './dto/update-retail-shop.input';

@Injectable()
export class RetailShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.retailShop.findMany();
  }

  async findOne(id: string) {
    return this.prisma.retailShop.findUnique({ where: { id } });
  }

  async findByAddress(address: string) {
    return this.prisma.retailShop.findMany({
      where: { address: { contains: address } },
    });
  }

  async create(data: CreateRetailShopInput) {
    return this.prisma.retailShop.create({ data });
  }

  async update(id: string, data: UpdateRetailShopInput) {
    return this.prisma.retailShop.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.retailShop.delete({ where: { id } });
  }
}
