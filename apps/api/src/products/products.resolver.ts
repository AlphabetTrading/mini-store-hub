import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Product } from './models/product.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateProductInput } from './dto/create-product.input';
import {
  PaginationProducts,
  PaginationProductsWithExtraInfo,
} from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { FilterProductInput } from './dto/filter-product.input';
import { Prisma } from '@prisma/client';
import { UpdateProductInput } from './dto/update-product.input';
import { OrderByProductInput } from './dto/order-by-product.input';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => PaginationProducts, { name: 'products' })
  async products(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProducts> {
    const where: Prisma.ProductWhereInput = {
      AND: [
        {
          id: filterProductInput?.id,
        },
        {
          OR: [
            {
              name: filterProductInput?.name,
            },
            {
              amharicName: filterProductInput?.name,
            },
            {
              serialNumber: filterProductInput?.serialNumber,
            },
            {
              description: filterProductInput?.description,
            },
            {
              category: filterProductInput?.category,
            },
          ],
        },

        {
          createdAt: filterProductInput?.createdAt,
        },
      ],
    };
    try {
      const products = await this.productsService.findAll({
        where,
        // orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : undefined,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.productsService.count(where);
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsByTopProfit',
  })
  async findProductsByTopProfit(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
        ],
      };

      const products = await this.productsService.findProductsByTopProfit({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsByTopSell',
  })
  async findProductsByTopSelling(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSale({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsByTopSellAndByRetailShop',
  })
  async findProductsByTopSellingByRetailShop(
    @Args('retailShopId', {
      type: () => String,
    })
    retailShopId?: string,
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
          {
            retailShopStock: {
              every: {
                retailShopId,
              },
            },
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSale({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsByTopSellAndByWarehouse',
  })
  async findProductsByTopSellingByWarehouse(
    @Args('warehouseId', {
      type: () => String,
    })
    warehouseId?: string,
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
          {
            warehouseStock: {
              every: {
                warehouseId,
              },
            },
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSale({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsBySoldQuantity',
  })
  async findProductsBySoldQuantity(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSoldQuantity(
        {
          where,
          orderBy,
          skip: paginationInput?.skip,
          take: paginationInput?.take,
        },
      );

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsBySoldQuantityAndRetailShop',
  })
  async findProductsBySoldQuantityAndRetailShop(
    @Args('retailShopId', {
      type: () => String,
    })
    retailShopId?: string,
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
          {
            retailShopStock: {
              every: {
                retailShopId,
              },
            },
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSoldQuantity(
        {
          where,
          orderBy,
          skip: paginationInput?.skip,
          take: paginationInput?.take,
        },
      );

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => PaginationProductsWithExtraInfo, {
    name: 'findProductsBySoldQuantityAndWarehouse',
  })
  async findProductsBySoldQuantityAndWarehouse(
    @Args('warehouseId', {
      type: () => String,
    })
    warehouseId?: string,
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => OrderByProductInput,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: OrderByProductInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProductsWithExtraInfo> {
    try {
      const where: Prisma.ProductWhereInput = {
        AND: [
          {
            id: filterProductInput?.id,
          },
          {
            OR: [
              {
                name: filterProductInput?.name,
              },
              {
                amharicName: filterProductInput?.name,
              },
            ],
          },
          {
            serialNumber: filterProductInput?.serialNumber,
          },
          {
            description: filterProductInput?.description,
          },
          {
            category: filterProductInput?.category,
          },
          {
            createdAt: filterProductInput?.createdAt,
          },
          {
            warehouseStock: {
              every: {
                warehouseId,
              },
            },
          },
        ],
      };

      const products = await this.productsService.findProductsByTopSoldQuantity(
        {
          where,
          orderBy,
          skip: paginationInput?.skip,
          take: paginationInput?.take,
        },
      );

      const count = await this.productsService.count();
      return {
        items: products,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  // generate functions for insights
  // top profit
  // top sale
  // top sold quantity
  // top profit by category
  // top sale by category
  // top sold quantity by category
  // top profit by retail shop
  // top sale by retail shop

  // top sold quantity by retail shop
  // top profit by retail shop and category
  // top sale by retail shop and category
  // top sold quantity by retail shop and category
  // top profit by retail shop and product
  // top sale by retail shop and product
  // top sold quantity by retail shop and product
  // top profit by retail shop and product and category
  // top sale by retail shop and product and category
  // top sold quantity by retail shop and product and category
  // top profit by product
  // top sale by product
  // top sold quantity by product
  // top profit by product and category
  // top sale by product and category
  // top sold quantity by product and category
  // top profit by product and retail shop
  // top sale by product and retail shop
  // top sold quantity by product and retail shop
  // top profit by product and retail shop and category

  // search product
  @Query(() => [Product], { name: 'searchProducts' })
  async searchProducts(@Args('search') term: string): Promise<any> {
    return this.productsService.searchProduct(term);
  }

  // search product by category
  @Query(() => [Product], { name: 'searchProductsByCategory' })
  async searchProductsByCategory(
    @Args('search') term: string,
    @Args('category') category: string,
  ): Promise<Product[]> {
    return this.productsService.searchProductByCategory(term, category);
  }

  @Query(() => Product, { name: 'product' })
  async product(@Args('productId') productId: string): Promise<Product> {
    return this.productsService.findOne(productId);
  }

  @Query(() => [Product], { name: 'productsByCategory' })
  async productsByCategory(category: string): Promise<Product[]> {
    return this.productsService.findByCategory(category);
  }

  @Query(() => [Product], { name: 'searchProduct' })
  async searchProduct(@Args('search') term: string): Promise<Product[]> {
    return this.productsService.searchProduct(term);
  }

  // total
  @Query(() => Number, { name: 'totalProducts' })
  async totalProducts(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
  ): Promise<number> {
    const where: Prisma.ProductWhereInput = {
      AND: [
        {
          id: filterProductInput?.id,
        },
        {
          OR: [
            {
              name: filterProductInput?.name,
            },
            {
              amharicName: filterProductInput?.name,
            },
          ],
        },
        {
          serialNumber: filterProductInput?.serialNumber,
        },
        {
          description: filterProductInput?.description,
        },
        {
          category: filterProductInput?.category,
        },
        {
          createdAt: filterProductInput?.createdAt,
        },
        {
          retailShopStock: {
            some: {
              retailShop: filterProductInput?.retailShop,
            },
          },
        },
        {
          warehouseStock: {
            some: {
              warehouse: filterProductInput?.warehouse,
            },
          },
        },
      ],
    };

    return this.productsService.count(where);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(@Args('data') data: CreateProductInput) {
    try {
      return this.productsService.create(data);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error creating product!');
    }
  }

  // @ResolveField('category', () => Category)
  // async category(@Parent() product: Product): Promise<Category> {
  //   return this.productsService.findOne(product.id).then((p) => p.category);
  // }

  // @ResolveField(() => PriceHistory)
  // async activePrice(@Args('activePriceId') id: string): Promise<PriceHistory> {
  //   return this.priceHistoryService.findOne(id);
  // }

  @Mutation(() => Product, { name: 'updateProduct' })
  async updateProduct(
    @Args('id') id: string,
    @Args('data') data: UpdateProductInput,
  ) {
    try {
      return this.productsService.update(id, data);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error updating product!');
    }
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    try {
      return this.productsService.remove(id);
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Error deleting product!');
    }
  }
}
