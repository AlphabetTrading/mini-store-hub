import { Test, TestingModule } from '@nestjs/testing';
import { SaleTransactionsService } from './sale-transactions.service';

describe('SaleTransactionsService', () => {
  let service: SaleTransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleTransactionsService],
    }).compile();

    service = module.get<SaleTransactionsService>(SaleTransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
