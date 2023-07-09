import { Test, TestingModule } from '@nestjs/testing';
import { CatsResolver } from './storage.resolver';
import { CatsService } from './storage.service';

describe('CatsResolver', () => {
  let resolver: CatsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsResolver, CatsService],
    }).compile();

    resolver = module.get<CatsResolver>(CatsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
