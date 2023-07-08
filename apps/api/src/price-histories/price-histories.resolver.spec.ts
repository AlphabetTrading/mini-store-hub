import { Test, TestingModule } from '@nestjs/testing';
import { PriceHistoriesResolver } from './price-histories.resolver';
import { PriceHistoriesService } from './price-histories.service';

describe('PriceHistoriesResolver', () => {
  let resolver: PriceHistoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceHistoriesResolver, PriceHistoriesService],
    }).compile();

    resolver = module.get<PriceHistoriesResolver>(PriceHistoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
