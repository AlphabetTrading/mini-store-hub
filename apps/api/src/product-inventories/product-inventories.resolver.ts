import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductInventoriesService } from './product-inventories.service';
import { ProductInventory } from './models/product-inventory.model';
import { UpdateProductInventoryInput } from './dto/update-product.input';
import { CreateProductInventoryInput } from './dto/create-product-inventory.input';

@Resolver()
export class ProductInventoriesResolver {
  constructor(
    private readonly productInventoriesService: ProductInventoriesService,
  ) {}

  @Query(() => [ProductInventory], { name: 'productInventories' })
  async productInventories() {
    return this.productInventoriesService.findAll();
  }

  @Query(() => ProductInventory, { name: 'productInventory' })
  async productInventory(@Args('id') id: string) {
    return this.productInventoriesService.findOne(id);
  }

  @Query(() => [ProductInventory], { name: 'productInventoryByProductId' })
  async productInventoryByProductId(@Args('productId') productId: string) {
    return this.productInventoriesService.findByProductId(productId);
  }

  @Query(() => [ProductInventory], { name: 'productInventoryByWarehouseId' })
  async productInventoryByWarehouseId(
    @Args('warehouseId') warehouseId: string,
  ) {
    return this.productInventoriesService.findByWarehouseId(warehouseId);
  }

  @Query(() => [ProductInventory], {
    name: 'productInventoryByProductIdAndWarehouseId',
  })
  async productInventoryByProductIdAndWarehouseId(
    @Args('productId') productId: string,
    @Args('warehouseId') warehouseId: string,
  ) {
    return this.productInventoriesService.findByProductIdAndWarehouseId(
      productId,
      warehouseId,
    );
  }

  @Mutation(() => ProductInventory)
  async createProductInventory(
    @Args('data') data: CreateProductInventoryInput,
  ) {
    return this.productInventoriesService.create(data);
  }

  @Mutation(() => ProductInventory)
  async updateProductInventory(
    @Args('id') id: string,
    @Args('data') data: UpdateProductInventoryInput,
  ) {
    return this.productInventoriesService.update(id, data);
  }

  @Mutation(() => ProductInventory)
  async deleteProductInventory(@Args('id') id: string) {
    return this.productInventoriesService.remove(id);
  }
}
