import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { PrismaService } from 'src/prisma/prisma.service';

import { Product } from './models/product.model';
import { Prisma, TransactionType } from '@prisma/client';
import { ProductRankWithExtraInfo } from './models/products-with-info.model';

export const ProductsIncludeObject: Prisma.ProductInclude = {
  category: true,
  goods: true,
  retailShopStock: {
    include: {
      retailShop: true,
      warehouse: true,
      retailShopTransactionItems: true,
      activePrice: true,
      priceHistory: true,
      product: true,
    },
  },
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
  }): Promise<ProductRankWithExtraInfo[]> {
    const products = await this.prisma.product.findMany({
      where,
      orderBy,
      include: {
        // saleTransactionItem: true,
        category: true,
        retailShopStock: {
          
          include: {
            activePrice: true,
            retailShopTransactionItems: {
              include: {
                retailShopTransaction: true,
              },
            },
          },
        },
      },
    });

    const productsWithTotalSales: ProductRankWithExtraInfo[] = products.map(
      (product) => {
        const totalSales = product.retailShopStock.reduce(
          (acc, t) =>
            acc +
            t.retailShopTransactionItems.reduce(
              (acc, t) => acc + t.quantity,
              0,
            ),
          0,
        );
        return {
          value: totalSales,
          ...product,
        };
      },
    );

    productsWithTotalSales.sort((a, b) => {
      return b.value - a.value;
    });
    if (take)
      return productsWithTotalSales.slice(skip * take, (skip + 1) * take);

    return productsWithTotalSales;
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
  }): Promise<ProductRankWithExtraInfo[]> {
    const products = await this.prisma.product.findMany({
      orderBy,
      where,
      include: {
        retailShopStock: {
          include: {
            
            retailShopTransactionItems: {
              include: {

                retailShopTransaction: true,
              },
            },
            activePrice: true,
          },
        },
        category: true,
      },
    });

    const productsWithTotalSales: ProductRankWithExtraInfo[] = products.map(
      (product) => {
        const totalSalesB = product.retailShopStock.reduce(
          (acc, t) =>
            acc +
            t.retailShopTransactionItems.reduce(
              (acc, t) =>
                acc + t.transactionType == TransactionType.SALE
                  ? t.subTotal
                  : 0,
              0,
            ),
          0,
        );
        return {
          value: totalSalesB,
          ...product,
        };
      },
    );

    productsWithTotalSales.sort((a, b) => {
      return b.value - a.value;
    });

    if (take)
      return productsWithTotalSales.slice(skip * take, (skip + 1) * take);

    return productsWithTotalSales;
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
        ...where,
        goods: {
          every: {
            goodsTransfer: {
              sourceWarehouseId: '124',
            },
          },
        },
      },
      include: {
        category: true,
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
  }): Promise<ProductRankWithExtraInfo[]> {
    const products = await this.prisma.product.findMany({
      orderBy,
      where,
      include: {
        category: true,
        retailShopStock: {
          include: {
            retailShopTransactionItems: {},
          },
        },
      },
    });

    const productsWithTotalSales: ProductRankWithExtraInfo[] = products.map(
      (product) => {
        const soldTotalAmount = product.retailShopStock.reduce(
          (acc, t) =>
            acc +
            t.retailShopTransactionItems.reduce(
              (acc, t) => acc + t.subTotal,
              0,
            ),
          0,
        );

        const purchaseTotalAmount = product.retailShopStock.reduce(
          (acc, t) =>
            acc +
            t.retailShopTransactionItems.reduce(
              (acc, t) => acc + t.purchasePrice * t.quantity,
              0,
            ),
          0,
        );

        return {
          value: soldTotalAmount - purchaseTotalAmount,
          ...product,
        };
      },
    );
    productsWithTotalSales.sort((a, b) => {
      return b.value - a.value;
    });

    if (take)
      return productsWithTotalSales.slice(skip * take, (skip + 1) * take);

    return productsWithTotalSales;
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
