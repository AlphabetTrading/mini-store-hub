import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
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
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { PaginationWarehouseStocks } from 'src/common/pagination/pagination-info';
import { Prisma } from '@prisma/client';
import { OrderByWarehouseStockInput } from './dto/order-by-warehouse-stock.input';
import { StockValuation } from 'src/common/models/stockValuation.model';

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
      type: () => OrderByWarehouseStockInput,
      nullable: true,
    })
    orderBy?: OrderByWarehouseStockInput,
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
          product: filterWarehouseStockInput?.product && {
            OR: [
              {
                name: filterWarehouseStockInput.product?.name,
              },
              {
                amharicName: filterWarehouseStockInput.product?.name,
              },
              {
                serialNumber: filterWarehouseStockInput.product?.serialNumber,
              },
              {
                description: filterWarehouseStockInput.product?.description,
              },
              {
                category: filterWarehouseStockInput.product?.category,
              },
            ],
          },
        },
        {
          createdAt: filterWarehouseStockInput?.createdAt,
        },
      ],
    };
    try {
      const warehouseStocks = await this.warehouseStockService.findAll({
        where,
        orderBy,
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

  // find all warehouse stocks by goods transfer amount
  // @Query(() => PaginationWarehouseStocks, {
  //   name: 'warehouseStocksByGoodsTransferAmount',
  // })
  // async warehouseStocksByGoodsTransferAmount(
  //   @Args('filterWarehouseStockInput', {
  //     type: () => FilterWarehouseStockInput,
  //     nullable: true,
  //   })
  //   filterWarehouseStockInput?: FilterWarehouseStockInput,
  //   @Args('orderBy', {
  //     type: () => OrderByWarehouseStockInput,
  //     nullable: true,
  //   })
  //   orderBy?: OrderByWarehouseStockInput,
  //   @Args('paginationInput', { type: () => PaginationInput, nullable: true })
  //   paginationInput?: PaginationInput,
  // ): Promise<PaginationWarehouseStocks> {
  //   const where: Prisma.WarehouseStockWhereInput = {
  //     AND: [
  //       {
  //         id: filterWarehouseStockInput?.id,
  //       },
  //       {
  //         warehouse: filterWarehouseStockInput?.warehouse,
  //       },
  //       {
  //         product: filterWarehouseStockInput?.product,
  //       },
  //       {
  //         createdAt: filterWarehouseStockInput?.createdAt,
  //       },
  //     ],
  //   };
  //   try {
  //     const warehouseStocks = await this.warehouseStockService.findAllByGoodsTransferAmount(
  //       {
  //         where,
  //         orderBy,
  //         skip: paginationInput?.skip,
  //         take: paginationInput?.take,
  //       },
  //     );
  //     const count = await this.warehouseStockService.count(where);
  //     return {
  //       items: warehouseStocks,
  //       meta: {
  //         page: paginationInput?.skip,
  //         limit: paginationInput?.take,
  //         count,
  //       },
  //     };
  //   } catch (e) {
  //     throw new BadRequestException('Error loading products!');
  //   }
  // }

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

  @Query(() => StockValuation, {
    name: 'totalValuationByWarehouseId',
  })
  async totalValuationByWarehouseId(
    @Args('warehouseId') warehouseId: string,
  ): Promise<{
    totalQuantity: number;
    totalValuation: number;
    count: number;
  }> {
    return this.warehouseStockService.totalValuationByWarehouseId(warehouseId);
  }

  @Query(() => StockValuation, {
    name: 'totalValuationByWarehouseIdAndDate',
  })
  async totalValuationByWarehouseIdAndDate(
    @Args('warehouseId') warehouseId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<{
    totalQuantity: number;
    totalValuation: number;
    count: number;
  }> {
    return this.warehouseStockService.totalValuationByWarehouseIdAndDate(
      warehouseId,
      startDate,
      endDate,
    );
  }

  @Query(() => PaginationWarehouseStocks, {
    name: 'findLowStockByWarehouseId',
  })
  async findLowStockByWarehouseId(
    @Args('warehouseId') warehouseId: string,
    @Args('percentage', { type: () => Float, nullable: true })
    percentage: number = 10,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const warehouseStocks = await this.warehouseStockService.findLowStockItems({
      warehouseId,
      percentage,
      skip: paginationInput?.skip,
      take: paginationInput?.take,
    });

    const count = await this.warehouseStockService.count({});
    return {
      items: warehouseStocks,
      meta: {
        page: paginationInput?.skip,
        limit: paginationInput?.take,
        count,
      },
    };
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
