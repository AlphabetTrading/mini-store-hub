import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoodsTransfersService } from './goods-transfers.service';
import { GoodsTransfer } from './models/goods-transfer.model';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';

@Resolver()
export class GoodsTransfersResolver {
  constructor(private readonly goodsTransfersService: GoodsTransfersService) {}

  @Query(() => [GoodsTransfer], { name: 'goodsTransfers' })
  async goodsTransfers() {
    return this.goodsTransfersService.findAll();
  }

  @Query(() => GoodsTransfer, { name: 'goodsTransfer' })
  async GoodsTransfer(@Args('id') id: string) {
    return this.goodsTransfersService.findOne(id);
  }

  @Query(() => [GoodsTransfer], {
    name: 'goodsTransferByWarehouseId',
  })
  async GoodsTransferByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.goodsTransfersService.findByWarehouseId(warehouseId);
  }

  @Mutation(() => GoodsTransfer)
  async createGoodsTransfer(@Args('data') data: CreateGoodsTransferInput) {
    return this.goodsTransfersService.create(data);
  }

  @Mutation(() => GoodsTransfer)
  async updateGoodsTransfer(
    @Args('id') id: string,
    @Args('data') data: UpdateGoodsTransferInput,
  ) {
    return this.goodsTransfersService.update(id, data);
  }

  @Mutation(() => GoodsTransfer)
  async deleteGoodsTransfer(@Args('id') id: string) {
    return this.goodsTransfersService.remove(id);
  }
}
