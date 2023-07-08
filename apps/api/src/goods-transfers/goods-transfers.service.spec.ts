import { Test, TestingModule } from '@nestjs/testing';
import { GoodsTransfersService } from './goods-transfers.service';

describe('GoodsTransfersService', () => {
  let service: GoodsTransfersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsTransfersService],
    }).compile();

    service = module.get<GoodsTransfersService>(GoodsTransfersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
