import { Resolver } from '@nestjs/graphql';
import { GoodsTransfersService } from './goods-transfers.service';

@Resolver()
export class GoodsTransfersResolver {
  constructor(private readonly goodsTransfersService: GoodsTransfersService) {}
}
