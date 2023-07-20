import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoodsTransfersService } from './goods-transfers.service';
import { GoodsTransfer } from './models/goods-transfer.model';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';
import { TransferType } from '@prisma/client';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';

@Resolver(() => GoodsTransfer)
@UseGuards(GqlAuthGuard)
export class GoodsTransfersResolver {
  constructor(private readonly goodsTransfersService: GoodsTransfersService) {}

  @Query(() => [GoodsTransfer], { name: 'goodsTransfers' })
  async goodsTransfers() {
    return this.goodsTransfersService.findAll();
  }

  @Query(() => GoodsTransfer, { name: 'goodsTransfer' })
  async goodsTransfer(@Args('id') id: string) {
    return this.goodsTransfersService.findOne(id);
  }

  @Query(() => [GoodsTransfer], {
    name: 'goodsTransferByWarehouseId',
  })
  async GoodsTransferByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.goodsTransfersService.findByWarehouseId(warehouseId);
  }

  @Mutation(() => GoodsTransfer, { name: 'createGoodsTransfer' })
  async createGoodsTransfer(@Args('data') data: CreateGoodsTransferInput) {
    if (!data.goods || data.goods.length < 1) {
      throw new Error('Goods cannot be empty');
    }
    if (data.transferType === TransferType.WarehouseToRetailShop) {
      if (!data.sourceWarehouseId) {
        throw new Error('Warehouse Id cannot be empty');
      }
      return this.goodsTransfersService.transferToRetailShop(data);
    } else {
      if (!data.destinationWarehouseId) {
        throw new Error('Warehouse Id cannot be empty');
      }
      return this.goodsTransfersService.transferToWarehouse(data);
    }
  }

  @Mutation(() => GoodsTransfer)
  async updateGoodsTransfer(
    @Args('id') id: string,
    @Args('data') data: UpdateGoodsTransferInput,
  ) {
    if (!data.transferType) {
      throw new Error('Transfer Type cannot be empty');
    }

    if (data.transferType === TransferType.WarehouseToRetailShop) {
      if (!data.sourceWarehouseId) {
        throw new Error('Warehouse Id cannot be empty');
      }
      return this.goodsTransfersService.updateTransferToRetailShop(id, data);
    } else {
      if (!data.destinationWarehouseId) {
        throw new Error('Warehouse Id cannot be empty');
      }
      return this.goodsTransfersService.updateTransferToWarehouse(id, data);
    }
  }

  @Mutation(() => GoodsTransfer)
  async deleteGoodsTransfer(@Args('id') id: string) {
    return this.goodsTransfersService.remove(id);
  }
}
