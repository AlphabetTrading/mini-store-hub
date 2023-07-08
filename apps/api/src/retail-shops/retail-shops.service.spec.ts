import { Test, TestingModule } from '@nestjs/testing';
import { RetailShopsService } from './retail-shops.service';

describe('RetailShopsService', () => {
  let service: RetailShopsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetailShopsService],
    }).compile();

    service = module.get<RetailShopsService>(RetailShopsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
