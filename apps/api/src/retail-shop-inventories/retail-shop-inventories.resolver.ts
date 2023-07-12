import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RetailShopStockService } from './retail-shop-inventories.service';
import { RetailShopStock } from './models/retail-shop-inventory.model';
import { CreateRetailShopStockInput } from './dto/create-retail-shop-inventory.input';
import { UpdateRetailShopStockInput } from './dto/update-retail-shop.input';

@Resolver()
export class RetailShopStockResolver {
  constructor(
    private readonly retailShopStockService: RetailShopStockService,
  ) {}

  @Query(() => [RetailShopStock], { name: 'retailShopStockService' })
  async productStock() {
    return this.retailShopStockService.findAll();
  }

  @Query(() => RetailShopStock, { name: 'retailShopStock' })
  async RetailShopStock(@Args('id') id: string) {
    return this.retailShopStockService.findOne(id);
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByProductId',
  })
  async RetailShopStockByProductId(@Args('productId') productId: string) {
    return this.retailShopStockService.findByProductId(productId);
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByWarehouseId',
  })
  async RetailShopStockByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.retailShopStockService.findByWarehouseId(warehouseId);
  }

  @Query(() => [RetailShopStock], {
    name: 'retailShopStockByProductIdAndWarehouseId',
  })
  async RetailShopStockByProductIdAndWarehouseId(
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
  ) {
    return this.retailShopStockService.findByProductIdAndWarehouseId(
      productId,
      warehouseId,
    );
  }

  @Mutation(() => RetailShopStock)
  async createRetailShopStock(@Args('data') data: CreateRetailShopStockInput) {
    return this.retailShopStockService.create(data);
  }

  @Mutation(() => RetailShopStock)
  async updateRetailShopStock(
    @Args('id') id: string,
    @Args('data') data: UpdateRetailShopStockInput,
  ) {
    return this.retailShopStockService.update(id, data);
  }

  @Mutation(() => RetailShopStock)
  async deleteRetailShopStock(@Args('id') id: string) {
    return this.retailShopStockService.remove(id);
  }
}
