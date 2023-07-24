import { Test, TestingModule } from '@nestjs/testing';
import { RetailShopStockResolver } from './retail-shop-inventories.resolver';
import { RetailShopStockService } from './retail-shop-inventories.service';

describe('retailShopStockResolver', () => {
  let resolver: RetailShopStockResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailShopStockResolver, RetailShopStockService],
    }).compile();

    resolver = module.get<RetailShopStockResolver>(RetailShopStockResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
