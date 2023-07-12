import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './models/warehouse.model';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';

@Resolver()
export class WarehousesResolver {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Query(() => [Warehouse], { name: 'warehouses' })
  async warehouses() {
    return this.warehousesService.findAll();
  }

  @Query(() => Warehouse, { name: 'warehouse' })
  async warehouse(@Args('id') id: string) {
    return this.warehousesService.findOne(id);
  }

  @Query(() => [Warehouse], { name: 'warehousesByAddress' })
  async warehouseByAddress(@Args('address') address: string) {
    return this.warehousesService.findByAddress(address);
  }

  @Mutation(() => Warehouse)
  async createWarehouse(@Args('data') data: CreateWarehouseInput) {
    return this.warehousesService.create(data);
  }

  @Mutation(() => Warehouse)
  async updateWarehouse(
    @Args('id') id: string,
    @Args('data') data: UpdateWarehouseInput,
  ) {
    return this.warehousesService.update(id, data);
  }

  @Mutation(() => Warehouse)
  async deleteWarehouse(@Args('id') id: string) {
    return this.warehousesService.remove(id);
  }
}
