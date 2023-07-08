import { InputType, Field, PartialType, Float } from '@nestjs/graphql';
import { CreateRetailShopInput } from './create-retail-shop.input';

@InputType()
export class UpdateRetailShopInput extends PartialType(CreateRetailShopInput) {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => Float, { nullable: true })
  address: string;
}
