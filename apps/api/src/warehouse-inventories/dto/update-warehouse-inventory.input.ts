import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateWarehouseStockInput } from './create-warehouse-inventory.input';

@InputType()
export class UpdateWarehouseStockInput extends PartialType(
  CreateWarehouseStockInput,
) {
  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => String, { nullable: true })
  warehouseId: string;

  @Field(() => Float, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => Boolean, { nullable: true })
  isAll?: boolean;
}
