import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseStockService } from './warehouse-inventories.service';
import { WarehouseStock } from './models/warehouse-inventory.model';
import {
  CreateBulkWarehouseStockInput,
  CreateWarehouseStockInput,
} from './dto/create-warehouse-inventory.input';
import { UpdateWarehouseStockInput } from './dto/update-warehouse-inventory.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { FilterWarehouseStockInput } from './dto/filter-warehouse-stock.input';
import { WarehouseStockOrder } from './dto/warehouse-stock-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { PaginationWarehouseStocks } from 'src/common/pagination/pagination-info';
import { Prisma } from '@prisma/client';

@Resolver(() => WarehouseStock)
@UseGuards(GqlAuthGuard)
export class WarehouseStockResolver {
  constructor(private readonly warehouseStockService: WarehouseStockService) {}

  @Query(() => PaginationWarehouseStocks, { name: 'warehouseStocks' })
  async warehouseStocks(
    @Args('filterWarehouseStockInput', {
      type: () => FilterWarehouseStockInput,
      nullable: true,
    })
    filterWarehouseStockInput?: FilterWarehouseStockInput,
    @Args('orderBy', {
      type: () => WarehouseStockOrder,
      nullable: true,
    })
    orderBy?: WarehouseStockOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationWarehouseStocks> {
    const where: Prisma.WarehouseStockWhereInput = {
      AND: [
        {
          id: filterWarehouseStockInput?.id,
        },
        {
          warehouse: filterWarehouseStockInput?.warehouse,
        },
        {
          product: filterWarehouseStockInput?.product,
        },
        {
          createdAt: filterWarehouseStockInput?.createdAt,
        },
      ],
    };
    console.log(where.product);

    try {
      const warehouseStocks = await this.warehouseStockService.findAll({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.warehouseStockService.count(where);
      return {
        items: warehouseStocks,
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

  @Query(() => WarehouseStock, { name: 'warehouseStock' })
  async WarehouseStock(@Args('id') id: string) {
    return this.warehouseStockService.findOne(id);
  }

  @Query(() => [WarehouseStock], {
    name: 'warehouseStockByWarehouseId',
  })
  async WarehouseStockByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.warehouseStockService.findByWarehouseId(warehouseId);
  }

  @Mutation(() => WarehouseStock)
  async createWarehouseStock(@Args('data') data: CreateWarehouseStockInput) {
    return this.warehouseStockService.create(data);
  }

  @Mutation(() => [WarehouseStock])
  async createBulkWarehouseStock(
    @Args('data') data: CreateBulkWarehouseStockInput,
  ) {
    return this.warehouseStockService.createMany(data);
  }

  @Mutation(() => WarehouseStock)
  async updateWarehouseStock(
    @Args('id') id: string,
    @Args('data') data: UpdateWarehouseStockInput,
  ) {
    return this.warehouseStockService.update(id, data);
  }

  @Mutation(() => WarehouseStock)
  async deleteWarehouseStock(@Args('id') id: string) {
    return this.warehouseStockService.remove(id);
  }
}
