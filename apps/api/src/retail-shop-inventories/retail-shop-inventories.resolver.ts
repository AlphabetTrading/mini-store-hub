import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopStockService } from './retail-shop-inventories.service';
import { RetailShopStock } from './models/retail-shop-inventory.model';
import { CreateRetailShopStockInput } from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';
import { FilterRetailShopStockInput } from './dto/filter-retail-shop-stock.input';
import { RetailShopStockOrder } from './dto/retail-shop-stock-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationRetailShopStocks } from 'src/common/pagination/pagination-info';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => RetailShopStock)
@UseGuards(GqlAuthGuard)
export class RetailShopStockResolver {
  constructor(
    private readonly retailShopStockService: RetailShopStockService,
  ) {}

  @Query(() => [RetailShopStock], { name: 'retailShopStocks' })
  async retailShopStocks() {
    return this.retailShopStockService.findAll();
  }

  @Query(() => RetailShopStock, { name: 'retailShopStock' })
  async retailShopStock(@Args('id') id: string) {
    return this.retailShopStockService.findOne(id);
  }

  @Query(() => PaginationRetailShopStocks)
  async retailShopStockByRetailShopId(
    @Args('filterRetailShopStockInput', {
      type: () => FilterRetailShopStockInput,
      nullable: true,
    })
    filterRetailShopStockInput?: FilterRetailShopStockInput,
    @Args('orderBy', {
      type: () => RetailShopStockOrder,
      nullable: true,
    })
    orderBy?: RetailShopStockOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.RetailShopStockWhereInput = {
      id: filterRetailShopStockInput?.id,
      retailShopId: filterRetailShopStockInput.retailShopId,
      product: {
        name: {
          contains: filterRetailShopStockInput?.product?.name?.contains,
          mode: Prisma.QueryMode.insensitive,
        },
        createdAt: filterRetailShopStockInput.product?.createdAt,
      },
      createdAt: filterRetailShopStockInput?.createdAt,
    };
    try {
      const products = await this.retailShopStockService.findByRetailShopId({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.retailShopStockService.count(where);
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

  @Query(() => RetailShopStock)
  async retailShopStockByProductIdAndByRetailShopId(
    @Args('productId') productId: string,
    @Args('retailShopId') retailShopId: string,
  ) {
    return this.retailShopStockService.findByRetailShopIdAndProductId(
      retailShopId,
      productId,
    );
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByProductId',
  })
  async retailShopStockByProductId(@Args('productId') productId: string) {
    return this.retailShopStockService.findByProductId(productId);
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByWarehouseId',
  })
  async retailShopStockByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.retailShopStockService.findByWarehouseId(warehouseId);
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByProductIdAndWarehouseId',
  })
  async retailShopStockByProductIdAndWarehouseId(
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
  ) {
    return this.retailShopStockService.findByProductIdAndWarehouseId(
      productId,
      warehouseId,
    );
  }

  @Mutation(() => RetailShopStock)
  async createRetailShopStock(@Args('data') data: CreateRetailShopStockInput) {
    try {
      return this.retailShopStockService.create(data);
    } catch (e) {
      throw new Error(`Failed to create retail shop stock`);
    }
  }

  @Mutation(() => RetailShopStock)
  async updateRetailShopStock(
    @Args('id') id: string,
    @Args('data') data: UpdateRetailShopStockInput,
  ) {
    try {
      return this.retailShopStockService.update(id, data);
    } catch (e) {
      throw new Error(`Failed to update retail shop stock`);
    }
  }

  @Mutation(() => RetailShopStock)
  async deleteRetailShopStock(@Args('id') id: string) {
    try {
      return this.retailShopStockService.remove(id);
    } catch (e) {
      throw new Error(`Failed to delete retail shop stock`);
    }
  }
}
