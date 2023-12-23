import { Test, TestingModule } from '@nestjs/testing';
import { RetailShopTransactionsResolver } from './retailshop-transactions.resolver';
import { RetailShopTransactionsService } from './retailshop-transactions.service';

describe('RetailShopTransactionsResolver', () => {
  let resolver: RetailShopTransactionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailShopTransactionsResolver, RetailShopTransactionsService],
    }).compile();

    resolver = module.get<RetailShopTransactionsResolver>(RetailShopTransactionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
