import { Module } from '@nestjs/common';
import { PriceHistoriesService } from './price-histories.service';
import { PriceHistoriesResolver } from './price-histories.resolver';

@Module({
  providers: [PriceHistoriesResolver, PriceHistoriesService],
  exports: [PriceHistoriesService],
})
export class PriceHistoriesModule {}
