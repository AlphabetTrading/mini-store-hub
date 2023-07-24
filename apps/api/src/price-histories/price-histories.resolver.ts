import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PriceHistoriesService } from './price-histories.service';
import { PriceHistory } from './models/price-history.model';
import { CreatePriceHistoryInput } from './dto/create-product.input';
import { UpdatePriceHistoryInput } from './dto/update-product.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { FilterPriceHistoryInput } from './dto/filter-price-history.input';
import { PriceHistoryOrder } from './dto/price-history-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { PaginationPriceHistories } from 'src/common/pagination/pagination-info';
import { Prisma } from '@prisma/client';

@Resolver(() => PriceHistory)
@UseGuards(GqlAuthGuard)
export class PriceHistoriesResolver {
  constructor(private readonly priceHistoriesService: PriceHistoriesService) {}

  @Query(() => [PriceHistory])
  async priceHistories(): Promise<PriceHistory[]> {
    return this.priceHistoriesService.findAll();
  }

  @Query(() => PaginationPriceHistories, { name: 'priceHistoryByProduct' })
  async priceHistoryByProduct(
    @Args('filterPriceHistoryInput', {
      type: () => FilterPriceHistoryInput,
      nullable: true,
    })
    filterPriceHistoryInput?: FilterPriceHistoryInput,
    @Args('orderBy', {
      type: () => PriceHistoryOrder,
      nullable: true,
    })
    orderBy?: PriceHistoryOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationPriceHistories> {
    const where: Prisma.PriceHistoryWhereInput = {
      AND: [
        {
          id: filterPriceHistoryInput?.id,
        },
        {
          createdAt: filterPriceHistoryInput?.createdAt,
        },
        {
          product: {
            AND: [
              {
                id: filterPriceHistoryInput?.id,
              },

              {
                OR: [
                  {
                    name: filterPriceHistoryInput?.product?.name,
                  },
                  {
                    amharicName: filterPriceHistoryInput?.product?.name,
                  },
                ],
              },
              {
                serialNumber: filterPriceHistoryInput?.product?.serialNumber,
              },
            ],
          },
        },
      ],
    };

    try {
      const priceHistories = await this.priceHistoriesService.findByProductId({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.priceHistoriesService.count(where);
      return {
        items: priceHistories,
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

  // get single price history by id
  @Query(() => PriceHistory, { name: 'priceHistoryById' })
  async priceHistoryById(@Args('id') id: string): Promise<PriceHistory> {
    return this.priceHistoriesService.findOne(id);
  }

  @Mutation(() => PriceHistory, {
    name: 'createPriceHistory',
    description: 'Create a new price history',
  })
  async createPriceHistory(
    @Args('priceHistory') priceHistory: CreatePriceHistoryInput,
  ): Promise<PriceHistory> {
    return this.priceHistoriesService.create(priceHistory);
  }

  async updatePriceHistory(
    @Args('id') id: string,
    @Args('priceHistory') priceHistory: UpdatePriceHistoryInput,
  ): Promise<PriceHistory> {
    return this.priceHistoriesService.update(id, priceHistory);
  }

  @Mutation(() => PriceHistory)
  async deletePriceHistory(@Args('id') id: string): Promise<PriceHistory> {
    return this.priceHistoriesService.remove(id);
  }
}
