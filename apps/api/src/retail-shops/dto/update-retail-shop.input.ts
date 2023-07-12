import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRetailShopInput } from './create-retail-shop.input';

@InputType()
export class UpdateRetailShopInput extends PartialType(CreateRetailShopInput) {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;
}
