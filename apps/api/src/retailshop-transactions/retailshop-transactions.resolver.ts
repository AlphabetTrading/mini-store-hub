import { Args, Float, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopTransactionsService } from './retailshop-transactions.service';
import { RetailShopTransaction } from './models/retailshop-transaction.model';
import { UpdateRetailShopTransactionInput } from './dto/update-retailshop-transaction.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { FilterRetailShopTransactionInput } from './dto/filter-retailshop-transactions-input';
import { OrderByRetailShopTransactionInput } from './dto/retailshop-transaction-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import {
  PaginationRetailShopTransactions,
  PaginationRetailShopsWithExtraInfo,
} from 'src/common/pagination/pagination-info';
import { Prisma } from '@prisma/client';
import { CreateBulkRetailShopTransactionInput } from './dto/create-bulk-retailshop-transaction.input';
import { RetailShopsService } from 'src/retail-shops/retail-shops.service';
import { UserEntity } from 'src/common/decorators';
import { User } from 'src/users/models/user.model';

@Resolver(() => RetailShopTransaction)
@UseGuards(GqlAuthGuard)
export class RetailShopTransactionsResolver {
  constructor(
    private readonly retailShopTransactionsService: RetailShopTransactionsService,
    private readonly retailShopService: RetailShopsService,
  ) {}

  @Query(() => PaginationRetailShopTransactions, {
    name: 'retailShopTransactions',
  })
  async findAll(
    @Args('filterRetailShopTransactionInput', {
      type: () => FilterRetailShopTransactionInput,
      nullable: true,
    })
    filterRetailShopTransactionInput?: FilterRetailShopTransactionInput,
    @Args('orderBy', {
      type: () => OrderByRetailShopTransactionInput,
      nullable: true,
    })
    orderBy?: OrderByRetailShopTransactionInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationRetailShopTransactions> {
    try {
      const where: Prisma.RetailShopTransactionWhereInput = {
        id: filterRetailShopTransactionInput?.id,
        retailShop: filterRetailShopTransactionInput?.retailShop,
        retailShopTransactionItems: {
          every: filterRetailShopTransactionInput?.retailShopTransactionsItems as any,
        },
        createdAt: filterRetailShopTransactionInput?.createdAt,
      };

      const salesTransactions =
        await this.retailShopTransactionsService.findAll({
          where,
          orderBy,
          skip: paginationInput?.skip,
          take: paginationInput?.take,
        });

      const count = await this.retailShopTransactionsService.count(where);
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

  @Query(() => RetailShopTransaction, { name: 'retailShopTransaction' })
  async findOne(@Args('id') id: string): Promise<RetailShopTransaction> {
    return this.retailShopTransactionsService.findOne(id);
  }

  @Query(() => PaginationRetailShopTransactions, {
    name: 'retailShopTransactionsByRetailShop',
  })
  async findAllByRetailShop(
    @Args('retailShopId') id: string,
    @Args('orderBy', {
      type: () => OrderByRetailShopTransactionInput,
      nullable: true,
    })
    orderBy?: OrderByRetailShopTransactionInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.RetailShopTransactionWhereInput = {
      retailShop: {
        id,
      },
    };

    const salesTransactions = await this.retailShopTransactionsService.findAll({
      where,
      orderBy,
      skip: paginationInput?.skip,
      take: paginationInput?.take,
    });

    const count = await this.retailShopTransactionsService.count(where);

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
    return this.retailShopTransactionsService.totalSalesByRetailShop(id);
  }

  @Query(() => Float)
  async totalSalesByProduct(@Args('productId') id: string): Promise<number> {
    return this.retailShopTransactionsService.totalSalesByProduct(id);
  }

  // calculate totalSales
  @Query(() => Float)
  async totalSales(): Promise<number> {
    return this.retailShopTransactionsService.totalSales();
  }

  @Query(() => Float)
  async totalSalesByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSalesByDate(
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalTransactionsByDate(
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalTransactionsByDate(
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
      await this.retailShopTransactionsService.retailShopRankByTotalSales(
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
      await this.retailShopTransactionsService.retailShopRankByTotalProfit(
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
      await this.retailShopTransactionsService.retailShopRankByTotalTransactions(
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
    return this.retailShopTransactionsService.totalTransactionsByRetailShopAndDate(
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
    return this.retailShopTransactionsService.totalSalesByRetailShopByDate(
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
    return this.retailShopTransactionsService.totalSalesByProductByDate(
      productId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfit(): Promise<number> {
    return this.retailShopTransactionsService.totalProfit();
  }

  @Query(() => Float)
  async totalProfitByDate(
    @Args('startDate')
    startDate: string,
    @Args('endDate')
    endDate: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalProfitByDate(
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfitByDateAndRetailShop(
    @Args('retailShopId') id: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ) {
    return this.retailShopTransactionsService.totalProfitByRetailShopByDate(
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
    return this.retailShopTransactionsService.totalProfitByProductByDate(
      productId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalProfitByRetailShop(
    @Args('retailShopId') id: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalProfitByRetailShop(id);
  }

  @Query(() => Float)
  async totalProfitByProduct(@Args('productId') id: string): Promise<number> {
    return this.retailShopTransactionsService.totalProfitByProduct(id);
  }

  @Query(() => Float)
  async totalProfitByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalProfitByRetailShopAndProduct(
      retailShopId,
      productId,
    );
  }

  @Query(() => Float)
  async totalSalesByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSalesByRetailShopAndProduct(
      retailShopId,
      productId,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShopAndProduct(
    @Args('retailShopId') retailShopId: string,
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSoldQuantityByRetailShopAndProduct(
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
    return this.retailShopTransactionsService.totalSoldProductsByRetailShopAndDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShop(
    @Args('retailShopId') retailShopId: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSoldQuantityByRetailShop(
      retailShopId,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByProduct(
    @Args('productId') productId: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSoldQuantityByProduct(
      productId,
    );
  }

  @Query(() => Float)
  async totalSoldQuantityByRetailShopAndByDate(
    @Args('retailShopId') retailShopId: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<number> {
    return this.retailShopTransactionsService.totalSoldQuantityByDate(
      retailShopId,
      startDate,
      endDate,
    );
  }

  @Mutation(() => RetailShopTransaction)
  async createRetailShopTransaction(
    @UserEntity() user: User,
    @Args('data') data: CreateBulkRetailShopTransactionInput,
  ): Promise<RetailShopTransaction> {
    return this.retailShopTransactionsService.createRetailShopTransaction(
      user.id,
      data,
    );
  }

  @Mutation(() => RetailShopTransaction)
  async updateRetailShopTransaction(
    @Args('id') id: string,
    @Args('data') data: UpdateRetailShopTransactionInput,
  ) {
    return this.retailShopTransactionsService.update(id, data);
  }

  @Mutation(() => RetailShopTransaction)
  async deleteRetailShopTransaction(@Args('id') id: string) {
    return this.retailShopTransactionsService.remove(id);
  }

  @Mutation(() => RetailShopTransaction)
  async restoreInRetailShopTransaction(@Args('id') id: string) {
    return this.retailShopTransactionsService.restoreInTransaction(id);
  }

  // @Subscription('inventoryUpdated', () => null)
  // inventoryUpdated() {
  //   return pubSub.asyncIterator('inventoryUpdated');
  // }
}
