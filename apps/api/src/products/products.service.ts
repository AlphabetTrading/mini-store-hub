import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

import { Product } from './models/product.model';
import { Prisma } from '@prisma/client';

export const ProductsIncludeObject: Prisma.ProductInclude = {
  category: true,
  activePrice: true,
  priceHistory: true,
  saleTransactionItem: true,
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

  async findProductsByTopSoldQuantity({
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
    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      include: {
        saleTransactionItem: true,
      },
    });

    products.sort((a, b) => {
      const totalSalesA = a.saleTransactionItem.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );
      const totalSalesB = b.saleTransactionItem.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );

      return totalSalesB - totalSalesA;
    });

    // paginate if there is skip and take

    if (take) return products.slice(skip * take, (skip + 1) * take);
    return products;
  }

  async findProductsByTopSale({
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
    const products = await this.prisma.product.findMany({
      orderBy,
      where,
      include: {
        saleTransactionItem: true,
      },
    });
    products.sort((a, b) => {
      const totalSalesA = a.saleTransactionItem.reduce(
        (acc, t) => acc + t.subTotal,
        0,
      );
      const totalSalesB = b.saleTransactionItem.reduce(
        (acc, t) => acc + t.subTotal,
        0,
      );

      return totalSalesB - totalSalesA;
    });

    if (take) return products.slice(skip * take, (skip + 1) * take);

    return products;
  }

  async findProductsByTopGoodsTransfer({
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
    const products = await this.prisma.product.findMany({
      orderBy,
      where: {
        goods: {
          every: {
            goodsTransfer: {
              sourceWarehouseId: '124',
            },
          },
        },
      },
      include: {
        goods: {
          where: {},
        },
      },
    });

    products.sort((a, b) => {
      const totalGoodsTransferA = a.goods.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );
      const totalGoodsTransferB = b.goods.reduce(
        (acc, t) => acc + t.quantity,
        0,
      );

      return totalGoodsTransferB - totalGoodsTransferA;
    });

    if (take) return products.slice(skip * take, (skip + 1) * take);

    return products;
  }

  async findProductsByTopProfit({
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
    const products = await this.prisma.product.findMany({
      orderBy,
      where,
      include: {
        saleTransactionItem: {
          include: {
            soldPriceHistory: true,
          },
        },
      },
    });

    products.sort((a, b) => {
      const totalProfitA = a.saleTransactionItem.reduce(
        (acc, t) => acc + t.subTotal,
        0,
      );
      const totalProfitB = b.saleTransactionItem.reduce(
        (acc, t) => acc + t.soldPriceHistory.purchasedPrice * t.quantity,
        0,
      );

      return totalProfitB - totalProfitA;
    });
    if (take) return products.slice(skip * take, (skip + 1) * take);

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
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found');
    }

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
      include: ProductsIncludeObject,
    });
  }

  async update(id: string, data: UpdateProductInput) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.prisma.product.update({
      where: { id },
      data,
      include: ProductsIncludeObject,
    });
  }

  async remove(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new Error('Product not found');
    }

    return this.prisma.product.delete({
      where: { id },
      include: ProductsIncludeObject,
    });
  }
}
