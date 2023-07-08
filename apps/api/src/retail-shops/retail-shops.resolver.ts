import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopsService } from './retail-shops.service';
import { RetailShop } from './models/retail-shop.model';
import { CreateRetailShopInput } from './dto/create-retail-shop.input';
import { UpdateRetailShopInput } from './dto/update-retail-shop.input';

@Resolver()
export class RetailShopsResolver {
  constructor(private readonly retailShopsService: RetailShopsService) {}

  @Query(() => [RetailShop], { name: 'retailShops' })
  async retailShops() {
    return this.retailShopsService.findAll();
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
