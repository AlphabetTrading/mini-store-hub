import { Test, TestingModule } from '@nestjs/testing';
import { RetailShopInventoriesService } from './retail-shop-inventories.service';

describe('RetailShopInventoriesService', () => {
  let service: RetailShopInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailShopInventoriesService],
    }).compile();

    service = module.get<RetailShopInventoriesService>(
      RetailShopInventoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
