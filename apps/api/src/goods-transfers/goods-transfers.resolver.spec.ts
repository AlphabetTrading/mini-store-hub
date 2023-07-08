import { Test, TestingModule } from '@nestjs/testing';
import { GoodsTransfersResolver } from './goods-transfers.resolver';
import { GoodsTransfersService } from './goods-transfers.service';

describe('GoodsTransfersResolver', () => {
  let resolver: GoodsTransfersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsTransfersResolver, GoodsTransfersService],
    }).compile();

    resolver = module.get<GoodsTransfersResolver>(GoodsTransfersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
