import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseInventoriesResolver } from './warehouse-inventories.resolver';
import { WarehouseInventoriesService } from './warehouse-inventories.service';

describe('WarehouseInventoriesResolver', () => {
  let resolver: WarehouseInventoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseInventoriesResolver, WarehouseInventoriesService],
    }).compile();

    resolver = module.get<WarehouseInventoriesResolver>(
      WarehouseInventoriesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
