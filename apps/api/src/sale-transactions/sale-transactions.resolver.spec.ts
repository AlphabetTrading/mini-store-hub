import { Test, TestingModule } from '@nestjs/testing';
import { SaleTransactionsResolver } from './sale-transactions.resolver';
import { SaleTransactionsService } from './sale-transactions.service';

describe('SaleTransactionsResolver', () => {
  let resolver: SaleTransactionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleTransactionsResolver, SaleTransactionsService],
    }).compile();

    resolver = module.get<SaleTransactionsResolver>(SaleTransactionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
