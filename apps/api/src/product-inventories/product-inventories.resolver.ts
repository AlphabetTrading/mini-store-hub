import { Resolver } from '@nestjs/graphql';
import { ProductInventoriesService } from './product-inventories.service';

@Resolver()
export class ProductInventoriesResolver {
  constructor(private readonly productInventoriesService: ProductInventoriesService) {}
}
