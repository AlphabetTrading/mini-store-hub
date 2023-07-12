import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseInventoriesService } from './warehouse-inventories.service';

describe('WarehouseInventoriesService', () => {
  let service: WarehouseInventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehouseInventoriesService],
    }).compile();

    service = module.get<WarehouseInventoriesService>(
      WarehouseInventoriesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
