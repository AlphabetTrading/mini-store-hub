import { InputType, Field, Float } from '@nestjs/graphql';
import { GoodsInput } from 'src/warehouse-inventories/dto/create-warehouse-inventory.input';

@InputType()
export class CreateRetailShopStockInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  warehouseId: string;

  @Field(() => Float)
  quantity: number;

  @Field(() => String)
  retailShopId: string;
}

@InputType()
export class CreateBulkRetailShopStockInput {
  @Field(() => String)
  warehouseId: string;

  @Field(() => [GoodsInput])
  goods: GoodsInput[];

  @Field(() => String)
  retailShopId: string;
}
