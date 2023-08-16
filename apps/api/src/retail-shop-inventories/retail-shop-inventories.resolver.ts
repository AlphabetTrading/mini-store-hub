import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopStockService } from './retail-shop-inventories.service';
import { RetailShopStock } from './models/retail-shop-inventory.model';
import {
  CreateBulkRetailShopStockInput,
  CreateRetailShopStockInput,
} from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';
import { FilterRetailShopStockInput } from './dto/filter-retail-shop-stock.input';
import { OrderByRetailShopStockInput } from './dto/retail-shop-stock-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaginationRetailShopStocks } from 'src/common/pagination/pagination-info';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { StockValuation } from 'src/common/models/stockValuation.model';

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
      type: () => OrderByRetailShopStockInput,
      nullable: true,
    })
    orderBy?: OrderByRetailShopStockInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.RetailShopStockWhereInput = {
      AND: [
        {
          id: filterRetailShopStockInput?.id,
        },
        {
          retailShopId: filterRetailShopStockInput?.retailShopId,
        },
        {
          product: filterRetailShopStockInput?.product,
        },
        {
          createdAt: filterRetailShopStockInput?.createdAt,
        },
      ],
    };
    try {
      const warehouseStocks =
        await this.retailShopStockService.findByRetailShopId({
          where,
          orderBy,
          skip: paginationInput?.skip,
          take: paginationInput?.take,
        });
      const count = await this.retailShopStockService.count(where);
      return {
        items: warehouseStocks,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading warehouseStocks!');
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

  // get single RetailShopStock
  @Query(() => RetailShopStock)
  async retailShopStockById(@Args('id') retailShopStockId: string) {
    return this.retailShopStockService.findOne(retailShopStockId);
  }

  @Query(() => StockValuation, {
    name: 'totalValuationByRetailShopId',
  })
  async totalValuationByRetailShopId(
    @Args('retailShopId') retailShopId: string,
  ): Promise<{
    totalValuation: number;
    totalQuantity: number;
    count: number;
  }> {
    return this.retailShopStockService.totalValuationByRetailShopId(
      retailShopId,
    );
  }

  @Query(() => StockValuation, {
    name: 'totalValuationByRetailShopIdAndDate',
  })
  async totalValuationByRetailShopIdAndDate(
    @Args('retailShopId') retailShopId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<{
    totalValuation: number;
    totalQuantity: number;
    count: number;
  }> {
    return this.retailShopStockService.totalValuationByRetailShopIdAndDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Query(() => PaginationRetailShopStocks, {
    name: 'findLowStockByRetailShopId',
  })
  async findLowStockByRetailShopId(
    @Args('retailShopId') retailShopId: string,
    @Args('percentage', { type: () => Float, nullable: true })
    percentage: number = 10,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const warehouseStocks = await this.retailShopStockService.findLowStockItems(
      {
        retailShopId,
        percentage,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      },
    );

    const count = await this.retailShopStockService.count({});
    return {
      items: warehouseStocks,
      meta: {
        page: paginationInput?.skip,
        limit: paginationInput?.take,
        count,
      },
    };
  }

  @Mutation(() => RetailShopStock)
  async createRetailShopStock(@Args('data') data: CreateRetailShopStockInput) {
    try {
      return this.retailShopStockService.create(data);
    } catch (e) {
      throw new Error(`Failed to create retail shop stock`);
    }
  }

  @Mutation(() => [RetailShopStock])
  async createBulkRetailShopStock(
    @Args('data') data: CreateBulkRetailShopStockInput,
  ) {
    try {
      return this.retailShopStockService.createMany(data);
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
