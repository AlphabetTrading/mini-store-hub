import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateWarehouseStockInput {
  @Field(() => String)
  productId: string;

  @Field(() => String)
  warehouseId: string;

  @Field(() => Float)
  quantity: number;
}

@InputType()
export class CreateBulkWarehouseStockInput {
  @Field(() => String)
  warehouseId: string;

  @Field(() => [GoodsInput])
  goods: GoodsInput[];
}

@InputType()
export class GoodsInput {
  @Field(() => String)
  productId: string;

  @Field(() => Float)
  quantity: number;
}
