import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehousesService } from './warehouses.service';

describe('WarehousesResolver', () => {
  let resolver: WarehousesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehousesResolver, WarehousesService],
    }).compile();

    resolver = module.get<WarehousesResolver>(WarehousesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
