import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehouseStockService } from './warehouse-inventories.service';
import { WarehouseStock } from './models/warehouse-inventory.model';
import { CreateWarehouseStockInput } from './dto/create-warehouse-inventory.input';
import { UpdateWarehouseStockInput } from './dto/update-warehouse-inventory.input';

@Resolver()
export class WarehouseStockResolver {
  constructor(private readonly warehouseStockService: WarehouseStockService) {}

  @Query(() => [WarehouseStock], { name: 'warehouseStock' })
  async warehouseStock() {
    return this.warehouseStockService.findAll();
  }

  @Query(() => WarehouseStock, { name: 'warehouseStock' })
  async WarehouseStock(@Args('id') id: string) {
    return this.warehouseStockService.findOne(id);
  }

  @Query(() => [WarehouseStock], {
    name: 'warehouseStockByWarehouseId',
  })
  async WarehouseStockByWarehouseId(@Args('warehouseId') warehouseId: string) {
    return this.warehouseStockService.findByWarehouseId(warehouseId);
  }

  @Query(() => [WarehouseStock], {
    name: 'warehouseStockByWarehouseIdAndWarehouseId',
  })
  async WarehouseStockByWarehouseIdAndWarehouseId(
    @Args('warehouseId') warehouseId: string,
  ) {
    return this.warehouseStockService.findByWarehouseId(warehouseId);
  }

  @Mutation(() => WarehouseStock)
  async createWarehouseStock(@Args('data') data: CreateWarehouseStockInput) {
    return this.warehouseStockService.create(data);
  }

  @Mutation(() => WarehouseStock)
  async updateWarehouseStock(
    @Args('id') id: string,
    @Args('data') data: UpdateWarehouseStockInput,
  ) {
    return this.warehouseStockService.update(id, data);
  }

  @Mutation(() => WarehouseStock)
  async deleteWarehouseStock(@Args('id') id: string) {
    return this.warehouseStockService.remove(id);
  }
}
