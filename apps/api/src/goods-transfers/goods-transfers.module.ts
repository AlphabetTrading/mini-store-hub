import { Module } from '@nestjs/common';
import { GoodsTransfersService } from './goods-transfers.service';
import { GoodsTransfersResolver } from './goods-transfers.resolver';

@Module({
  providers: [GoodsTransfersResolver, GoodsTransfersService],
})
export class GoodsTransfersModule {}
