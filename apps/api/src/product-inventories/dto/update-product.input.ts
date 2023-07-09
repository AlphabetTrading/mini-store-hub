import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateProductInventoryInput } from './create-product-inventory.input';

@InputType()
export class UpdateProductInventoryInput extends PartialType(
  CreateProductInventoryInput,
) {
  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => String, { nullable: true })
  warehouseId: string;

  @Field(() => Float, { nullable: true })
  quantity: number;
}
