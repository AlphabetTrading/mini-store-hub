import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopsService } from './retail-shops.service';
import { RetailShop } from './models/retail-shop.model';
import { CreateRetailShopInput } from './dto/create-retail-shop.input';
import { UpdateRetailShopInput } from './dto/update-retail-shop.input';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { FilterRetailShopInput } from './dto/filter-retail-shop.input';
import { RetailShopOrder } from './dto/warehouse-order.input';
import { PaginationRetailShops } from 'src/common/pagination/pagination-info';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { Prisma } from '@prisma/client';

@Resolver(() => RetailShop)
@UseGuards(GqlAuthGuard)
export class RetailShopsResolver {
  constructor(private readonly retailShopsService: RetailShopsService) {}

  @Query(() => PaginationRetailShops, { name: 'retailShops' })
  async retailShops(
    @Args('filterRetailShopInput', {
      type: () => FilterRetailShopInput,
      nullable: true,
    })
    filterRetailShopInput?: FilterRetailShopInput,
    @Args('orderBy', {
      type: () => RetailShopOrder,
      nullable: true,
    })
    orderBy?: RetailShopOrder,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationRetailShops> {
    const where: Prisma.RetailShopWhereInput = {
      id: filterRetailShopInput?.id,
      name: filterRetailShopInput?.name,
      createdAt: filterRetailShopInput?.createdAt,
    };
    try {
      const retailShops = await this.retailShopsService.findAll({
        where,
        orderBy: {
          [orderBy?.field]: orderBy?.direction,
        },
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.retailShopsService.count(where);
      return {
        items: retailShops,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => RetailShop, { name: 'retailShop' })
  async retailShop(@Args('id') id: string) {
    return this.retailShopsService.findOne(id);
  }

  @Query(() => [RetailShop], { name: 'retailShopsByAddress' })
  async retailShopsByAddress(@Args('address') address: string) {
    return this.retailShopsService.findByAddress(address);
  }

  @Mutation(() => RetailShop)
  async createRetailShop(@Args('data') data: CreateRetailShopInput) {
    return this.retailShopsService.create(data);
  }

  @Mutation(() => RetailShop)
  async updateRetailShop(
    @Args('id') id: string,
    @Args('data') data: UpdateRetailShopInput,
  ) {
    return this.retailShopsService.update(id, data);
  }

  @Mutation(() => RetailShop)
  async deleteRetailShop(@Args('id') id: string) {
    return this.retailShopsService.remove(id);
  }
}
