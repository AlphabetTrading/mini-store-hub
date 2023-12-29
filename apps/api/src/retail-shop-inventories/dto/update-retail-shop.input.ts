import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateRetailShopStockInput } from './create-retail-shop-inventory.input';

@InputType()
export class UpdateRetailShopStockInput extends PartialType(
  CreateRetailShopStockInput,
) {
  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => String, { nullable: true })
  warehouseId: string;

  @Field(() => String, { nullable: true })
  retailShopId: string;

  @Field(() => Float, { nullable: true })
  quantity: number;

  @Field(() => Float, { nullable: true })
  maxQuantity?: number;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => Boolean, { nullable: true })
  isAll?: boolean;

}
