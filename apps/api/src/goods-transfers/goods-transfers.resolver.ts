import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GoodsTransfersService } from './goods-transfers.service';
import { GoodsTransfer } from './models/goods-transfer.model';
import { CreateGoodsTransferInput } from './dto/create-goods-transfer.input';
import { UpdateGoodsTransferInput } from './dto/update-goods-transfer.input';
import { Prisma, TransferType } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { FilterCategoryInput } from 'src/categories/dto/filter-category.input';
import { FilterGoodsTransferInput } from './dto/filter-goods-transfer.input';
import { OrderByGoodsTransferInput } from './dto/goods-transfer-order.input';
import { PaginationGoodsTransfer } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { CreateGoodsTransferFromMainWarehouseInput } from './dto/create-goods-transfer-from-main.input';

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
      type: () => OrderByGoodsTransferInput,
      nullable: true,
    })
    orderBy?: OrderByGoodsTransferInput,
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
      orderBy,
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

  @Query(() => PaginationGoodsTransfer, {
    name: 'findGoodsTransferByWarehouseId',
  })
  async findAllGoodsTransferByWarehouseId(
    @Args('warehouseId') warehouseId: string,
    @Args('orderBy', {
      type: () => OrderByGoodsTransferInput,
      nullable: true,
    })
    orderBy?: OrderByGoodsTransferInput,

    // add pagination
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.GoodsTransferWhereInput = {
      OR: [
        {
          sourceWarehouseId: warehouseId,
        },
        {
          destinationWarehouseId: warehouseId,
        },
      ],
    };

    const count = await this.goodsTransfersService.count(where);

    const goodsTransfers = await this.goodsTransfersService.findByWarehouseId({
      where,
      orderBy,
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

  @Query(() => PaginationGoodsTransfer, {
    name: 'findOutgoingGoodsTransferByWarehouseId',
  })
  async findOutgoingGoodsTransferByWarehouseId(
    @Args('warehouseId') warehouseId: string,
    @Args('orderBy', { type: () => OrderByGoodsTransferInput, nullable: true })
    orderBy?: OrderByGoodsTransferInput,

    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.GoodsTransferWhereInput = {
      sourceWarehouseId: warehouseId,
    };

    const count = await this.goodsTransfersService.count(where);

    const goodsTransfers = await this.goodsTransfersService.findByWarehouseId({
      where,
      orderBy,
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

  @Query(() => PaginationGoodsTransfer, {
    name: 'findIncomingGoodsTransferByWarehouseId',
  })
  async findIncomingGoodsTransferByWarehouseId(
    @Args('warehouseId') warehouseId: string,
    @Args('orderBy', { type: () => OrderByGoodsTransferInput, nullable: true })
    orderBy?: OrderByGoodsTransferInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ) {
    const where: Prisma.GoodsTransferWhereInput = {
      destinationWarehouseId: warehouseId,
    };

    const count = await this.goodsTransfersService.count(where);

    const goodsTransfers = this.goodsTransfersService.findByWarehouseId({
      where,
      orderBy,
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
  async createGoodsTransferFromMainWarehouseToWarehouse(
    @Args('data') data: CreateGoodsTransferFromMainWarehouseInput,
  ) {
    if (!data.goods || data.goods.length < 1) {
      throw new Error('Goods cannot be empty');
    }
    if (!data.destinationWarehouseId) {
      throw new Error('destinationWarehouse Id cannot be empty');
    }
    return this.goodsTransfersService.transferToWarehouseFromMainWarehouse(
      data,
    );
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
