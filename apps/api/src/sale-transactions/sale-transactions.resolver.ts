import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SaleTransactionsService } from './sale-transactions.service';
import { SaleTransaction } from './models/sale-transaction.model';
import { UpdateSaleTransactionInput } from './dto/update-sale-transaction.input';
import { PubSub } from 'graphql-subscriptions';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { FilterSaleTransactionInput } from './dto/filter-sale-transactions-input';
import { OrderBySaleTransactionInput } from './dto/sale-transaction-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import {
  PaginationRetailShops,
  PaginationRetailShopsWithExtraInfo,
  PaginationSaleTransactions,
} from 'src/common/pagination/pagination-info';
import { Prisma } from '@prisma/client';
import { CreateBulkSaleTransactionInput } from './dto/create-bulk-sale-transaction.input';
import { RetailShopsService } from 'src/retail-shops/retail-shops.service';

const pubSub = new PubSub();
@Resolver(() => SaleTransaction)
@UseGuards(GqlAuthGuard)
export class SaleTransactionsResolver {
  constructor(
    private readonly saleTransactionsService: SaleTransactionsService, // private readonly RetailShopStockService: RetailShopStock,
    private readonly retailShopService: RetailShopsService,
  ) {}

  @Query(() => PaginationSaleTransactions, { name: 'saleTransactions' })
  async findAll(
    @Args('filterSaleTransactionInput', {
      type: () => FilterSaleTransactionInput,
      nullable: true,
    })
    filterSaleTransactionInput?: FilterSaleTransactionInput,
    @Args('orderBy', {
      type: () => OrderBySaleTransactionInput,
      nullable: true,
    })
    orderBy?: OrderBySaleTransactionInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationSaleTransactions> {
    try {
      const where: Prisma.SaleTransactionWhereInput = {
        AND: [
          {
            id: filterSaleTransactionInput?.id,
          },
          {
            retailShop: filterSaleTransactionInput?.retailShop,
          },
          {
            saleTransactionItems:
              filterSaleTransactionInput?.saleTransactionsItems,
          },
          {
            createdAt: filterSaleTransactionInput?.createdAt,
          },
        ],
      };

      const salesTransactions = await this.saleTransactionsService.findAll({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });

      console.log(salesTransactions, 'salesTransactions');
      const count = await this.saleTransactionsService.count(where);
      return {
        items: salesTransactions,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }

  @Query(() => SaleTransaction, { name: 'saleTransaction' })
  async findOne(@Args('id') id: string): Promise<SaleTransaction> {
    return this.saleTransactionsService.findOne(id);
  }

  @Query(() => PaginationSaleTransactions, {
    name: 'saleTransactionsByRetailShop',
  })
  async findAllByRetailShop(
    @Args('retailShopId') id: string,
    @Args('orderBy', {
      type: () => OrderBySaleTransactionInput,
      nullable: true,
    })
    orderBy?: OrderBySaleTransactionInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.SaleTransactionWhereInput = {
      retailShop: {
        id,
      },
    };

    const salesTransactions = await this.saleTransactionsService.findAll({
      where,
      orderBy,
      skip: paginationInput?.skip,
      take: paginationInput?.take,
    });

    const count = await this.saleTransactionsService.count(where);

    return {
      items: salesTransactions,
      meta: {
        page: paginationInput?.skip,
        limit: paginationInput?.take,
        count,
      },
    };
  }

  @Query(() => Float)
  async totalSalesByRetailShop(
    @Args('retailShopId') id: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSalesByRetailShop(id);
  }

  @Query(() => Float)
  async totalSalesByProduct(@Args('productId') id: string): Promise<number> {
    return this.saleTransactionsService.totalSalesByProduct(id);
  }

  // calculate totalSales
  @Query(() => Float)
  async totalSales(): Promise<number> {
    return this.saleTransactionsService.totalSales();
  }

  @Query(() => Float)
  async totalSalesByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSalesByDate(startDate, endDate);
  }

  @Query(() => Float)
  async totalTransactionsByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalTransactionsByDate(
      startDate,
      endDate,
    );
  }

  @Query(() => PaginationRetailShopsWithExtraInfo, {
    name: 'retailShopSortByTotalSales',
  })
  async retailShopRankByTotalSales(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const count = await this.retailShopService.count();
    const retailShops =
      await this.saleTransactionsService.retailShopRankByTotalSales(
        startDate,
        endDate,
        paginationInput?.skip || 0,
        paginationInput?.take || 10,
      );

    return {
      items: retailShops,
      meta: {
        page: paginationInput?.skip || 0,
        limit: paginationInput?.take || 10,
        count,
      },
    };
  }

  @Query(() => PaginationRetailShopsWithExtraInfo, {
    name: 'retailShopSortByTotalProfit',
  })
  async retailShopRankByTotalProfit(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const count = await this.retailShopService.count();
    const retailShops =
      await this.saleTransactionsService.retailShopRankByTotalProfit(
        startDate,
        endDate,
        paginationInput?.skip || 0,
        paginationInput?.take || 10,
      );

    return {
      items: retailShops,
      meta: {
        page: paginationInput?.skip || 0,
        limit: paginationInput?.take || 10,
        count,
      },
    };
  }

  @Query(() => PaginationRetailShopsWithExtraInfo, {
    name: 'retailShopSortByTotalTransactions',
  })
  async retailShopRankByTotalTransactions(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const count = await this.retailShopService.count();
    const retailShops =
      await this.saleTransactionsService.retailShopRankByTotalTransactions(
        startDate,
        endDate,
        paginationInput?.skip || 0,
        paginationInput?.take || 10,
      );

    return {
      items: retailShops,
      meta: {
        page: paginationInput?.skip || 0,
        limit: paginationInput?.take || 10,
        count,
      },
    };
  }

  @Query(() => Float)
  async totalTransactionsByRetailShopAndDate(
    @Args('retailShopId') retailShopId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalTransactionsByRetailShopAndDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalSalesByDateAndRetailShop(
    @Args('retailShopId')
    id: string,
    @Args('startDate')
    startDate: string,
    @Args('endDate')
    endDate: string,
  ) {
    return this.saleTransactionsService.totalSalesByRetailShopByDate(
      id,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalSalesByDateAndProduct(
    @Args('productId')
    productId: string,
    @Args('startDate')
    startDate: string,
    @Args('endDate')
    endDate: string,
  ) {
    return this.saleTransactionsService.totalSalesByProductByDate(
      productId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfit(): Promise<number> {
    return this.saleTransactionsService.totalProfit();
  }

  @Query(() => Float)
  async totalProfitByDate(
    @Args('startDate')
    startDate: string,
    @Args('endDate')
    endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalProfitByDate(startDate, endDate);
  }

  @Query(() => Float)
  async totalProfitByDateAndRetailShop(
    @Args('retailShopId') id: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.saleTransactionsService.totalProfitByRetailShopByDate(
      id,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfitByDateAndProduct(
    @Args('productId') productId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.saleTransactionsService.totalProfitByProductByDate(
      productId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfitByRetailShop(
    @Args('retailShopId') id: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalProfitByRetailShop(id);
  }

  @Query(() => Float)
  async totalProfitByProduct(@Args('productId') id: string): Promise<number> {
    return this.saleTransactionsService.totalProfitByProduct(id);
  }

  @Query(() => Float)
  async totalProfitByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalProfitByRetailShopAndProduct(
      retailShopId,
      productId,
    );
  }

  @Query(() => Float)
  async totalSalesByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSalesByRetailShopAndProduct(
      retailShopId,
      productId,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSoldQuantityByRetailShopAndProduct(
      retailShopId,
      productId,
    );
  }

  @Query(() => Float)
  async totalSoldProductsByRetailShopAndDate(
    @Args('retailShopId') retailShopId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSoldProductsByRetailShopAndDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShop(
    @Args('retailShopId') retailShopId: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSoldQuantityByRetailShop(
      retailShopId,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByProduct(
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSoldQuantityByProduct(productId);
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShopAndByDate(
    @Args('retailShopId') retailShopId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.saleTransactionsService.totalSoldQuantityByDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Mutation(() => SaleTransaction)
  async createSaleTransaction(
    @Args('data') data: CreateBulkSaleTransactionInput,
  ): Promise<SaleTransaction> {
    return this.saleTransactionsService.createSaleTransaction(data);
  }

  @Mutation(() => SaleTransaction)
  async updateSaleTransaction(
    @Args('id') id: string,
    @Args('data') data: UpdateSaleTransactionInput,
  ) {
    return this.saleTransactionsService.update(id, data);
  }

  @Mutation(() => SaleTransaction)
  async deleteSaleTransaction(@Args('id') id: string) {
    return this.saleTransactionsService.remove(id);
  }

  // @Subscription('inventoryUpdated', () => null)
  // inventoryUpdated() {
  //   return pubSub.asyncIterator('inventoryUpdated');
  // }
}
