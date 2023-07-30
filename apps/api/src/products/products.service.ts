import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

import { Product } from './models/product.model';
import { Prisma } from '@prisma/client';

export const ProductsIncludeObject = {
  category: true,
  activePrice: true,
  priceHistory: true,
  saleTransaction: true,
  goods: true,
  retailShopStock: true,
  warehouseStock: true,
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    return this.prisma.product.findMany({
      skip,
      take,
      where,
      orderBy,
      include: ProductsIncludeObject,
    });
  }

  async findProductsByTopSale({
    skip,
    take,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy,
      include: {
        saleTransaction: true,
      },
    });

    products.sort((a, b) => {
      const totalSalesA = a.saleTransaction.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );
      const totalSalesB = b.saleTransaction.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );

      return totalSalesB - totalSalesA;
    });

    if (skip && take) {
      return products.splice(skip, take);
    }
    return products;
  }

  async findProductsByTopProfit({
    skip,
    take,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy,
      include: {
        saleTransaction: true,
      },
    });

    products.sort((a, b) => {
      const totalProfitA = a.saleTransaction.reduce(
        (acc, t) => acc + (t.price - t.purchasedPrice) * t.quantity,
        0,
      );
      const totalProfitB = b.saleTransaction.reduce(
        (acc, t) => acc + (t.price - t.purchasedPrice) * t.quantity,
        0,
      );

      return totalProfitB - totalProfitA;
    });
    if (skip && take) {
      return products.splice(skip, take);
    }
    return products;
  }

  async count(where?: Prisma.ProductWhereInput): Promise<number> {
    return this.prisma.product.count({ where });
  }

  async findOne(id: string) {
    // check if product with this Id exists and if it doesn't return
    // "product with this Id doesn't" exists error

    const product = await this.prisma.product.findUnique({
      where: { id },
      include: ProductsIncludeObject,
    });
    if (!product) {
      throw new Error("Product with this Id doesn't exists");
    }

    return product;
  }

  async findByCategory(categoryId: string) {
    return this.prisma.product.findMany({ where: { categoryId } });
  }

  async searchProduct(search: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            serialNumber: {
              equals: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async searchProductByCategory(search: string, categoryId: string) {
    return this.prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            serialNumber: {
              equals: search,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
        categoryId,
      },
    });
  }

  async create(data: CreateProductInput) {
    // Pad the currentSerialNumber with leading zeros to ensure it's 4 digits

    const currentSerialNumber = await this.prisma.product.count();
    const serialNumber = currentSerialNumber.toString().padStart(4, '0');

    return this.prisma.product.create({
      data: {
        ...data,
        serialNumber,
      },
    });
  }

  async update(id: string, data: UpdateProductInput) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.product.delete({ where: { id } });
  }
}
