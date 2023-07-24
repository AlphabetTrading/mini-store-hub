import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Product } from './models/product.model';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { CreateProductInput } from './dto/create-product.input';
import { PaginationProducts } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { FilterProductInput } from './dto/filter-product.input';
import { Prisma } from '@prisma/client';
import { OrderByProductInput } from './dto/order-by-product.input';
import { ProductOrder, ProductOrderField } from './dto/product-order.input';

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
      type: () => ProductOrder,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: ProductOrder,
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
          ],
        },
        {
          serialNumber: filterProductInput?.serialNumber,
        },
        {
          description: filterProductInput?.description,
        },
        {
          category: {
            OR: [
              {
                name: filterProductInput?.category,
              },
              {
                amharicName: filterProductInput?.category,
              },
              {
                subcategories: {
                  every: {
                    name: {
                      contains: filterProductInput?.category?.contains,
                      mode: Prisma.QueryMode.insensitive,
                    },
                  },
                },
              },
            ],
          },
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
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
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

  @Query(() => PaginationProducts, { name: 'findProductsByTopProfit' })
  async findProductsByTopProfit(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => ProductOrder,
      nullable: true,
    })
    orderBy?: ProductOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProducts> {
    try {
      const products = await this.productsService.findProductsByTopProfit({
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
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

  @Query(() => PaginationProducts, { name: 'findProductsByTopSelling' })
  async findProductsByTopSelling(
    @Args('filterProductInput', {
      type: () => FilterProductInput,
      nullable: true,
    })
    filterProductInput?: FilterProductInput,
    @Args('orderBy', {
      type: () => ProductOrder,
      // type: () => OrderByProductInput,
      nullable: true,
    })
    orderBy?: ProductOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationProducts> {
    try {
      const products = await this.productsService.findProductsByTopSale({
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
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
  async totalProducts(): Promise<number> {
    return this.productsService.count({});
  }

  @Query(() => Number, { name: 'totalProductsByCategory' })
  async totalProductsByCategory(category: string): Promise<number> {
    return this.productsService.countByCategory(category);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async createProduct(@Args('data') data: CreateProductInput) {
    return this.productsService.create(data);
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
    @Args('data') data: CreateProductInput,
  ) {
    return this.productsService.update(id, data);
  }

  @Mutation(() => Product)
  async deleteProduct(@Args('id') id: string) {
    return this.productsService.remove(id);
  }
}
