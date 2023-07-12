import { Test, TestingModule } from '@nestjs/testing';
import { ProductInventoriesResolver } from './retail-shop-inventories.resolver';
import { ProductInventoriesService } from './retail-shop-inventories.service';

describe('ProductInventoriesResolver', () => {
  let resolver: ProductInventoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductInventoriesResolver, ProductInventoriesService],
    }).compile();

    resolver = module.get<ProductInventoriesResolver>(
      ProductInventoriesResolver,
    );
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
