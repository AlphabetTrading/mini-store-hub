import { Test, TestingModule } from '@nestjs/testing';
import { RetailShopsResolver } from './retail-shops.resolver';
import { RetailShopsService } from './retail-shops.service';

describe('RetailShopsResolver', () => {
  let resolver: RetailShopsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailShopsResolver, RetailShopsService],
    }).compile();

    resolver = module.get<RetailShopsResolver>(RetailShopsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
