import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PriceHistoriesService } from './price-histories.service';
import { PriceHistory } from './models/price-history.model';
import { CreatePriceHistoryInput } from './dto/create-product.input';
import { UpdatePriceHistoryInput } from './dto/update-product.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PriceHistoriesResolver {
  constructor(private readonly priceHistoriesService: PriceHistoriesService) {}

  @Query(() => [PriceHistory])
  async priceHistories(): Promise<PriceHistory[]> {
    return this.priceHistoriesService.findAll();
  }

  @Query(() => PriceHistory)
  async priceHistory(id: string): Promise<PriceHistory> {
    return this.priceHistoriesService.findOne(id);
  }

  @Query(() => [PriceHistory], { name: 'priceHistoryByProduct' })
  async priceHistoryByProduct(productId: string): Promise<PriceHistory[]> {
    return this.priceHistoriesService.findByProductId(productId);
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
