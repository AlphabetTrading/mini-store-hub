import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoodsTransfersService } from './goods-transfers.service';
import { GoodsTransfer } from './models/goods-transfer.model';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';
import { Prisma, TransferType } from '@prisma/client';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { FilterCategoryInput } from 'src/categories/dto/filter-category.input';
import { FilterGoodsTransferInput } from './dto/filter-goods-transfer.input';
import { GoodsTransferOrder } from './dto/goods-transfer-order.input';
import { PaginationGoodsTransfer } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';

@Resolver(() => GoodsTransfer)
@UseGuards(GqlAuthGuard)
export class GoodsTransfersResolver {
  constructor(private readonly goodsTransfersService: GoodsTransfersService) {}

  @Query(() => PaginationGoodsTransfer, { name: 'goodsTransfers' })
  async goodsTransfers(
    @Args('filterGoodsTransferInput', {
      type: () => FilterCategoryInput,
      nullable: true,
    })
    filterGoodsTransferInput?: FilterGoodsTransferInput,
    @Args('orderBy', {
      type: () => GoodsTransferOrder,
      nullable: true,
    })
    orderBy?: GoodsTransferOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationGoodsTransfer> {
    const where: Prisma.GoodsTransferWhereInput = {
      AND: [
        {
          id: filterGoodsTransferInput?.id,
        },
        {
          transferType: filterGoodsTransferInput?.transferType,
        },
        {
          sourceWarehouse: filterGoodsTransferInput?.sourceWarehouse,
        },
        {
          destinationWarehouse: filterGoodsTransferInput?.destinationWarehouse,
        },
        {
          createdAt: filterGoodsTransferInput?.createdAt,
        },
      ],
    };

    const count = await this.goodsTransfersService.count(where);

    const goodsTransfers = await this.goodsTransfersService.findAll({
      where,
      orderBy: {
        [orderBy?.field]: orderBy?.direction,
      },
      skip: paginationInput?.skip,
      take: paginationInput?.take,
    });

    return {
      items: goodsTransfers,
      meta: {
        count,
        limit: paginationInput?.take,
        page: paginationInput?.skip,
      },
    };
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
        throw new Error('sourceWarehouse Id cannot be empty');
      }
      return this.goodsTransfersService.transferToRetailShop(data);
    } else {
      if (!data.destinationWarehouseId) {
        throw new Error('destinationWarehouse Id cannot be empty');
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
