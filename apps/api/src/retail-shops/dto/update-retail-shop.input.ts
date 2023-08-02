import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateRetailShopInput } from './create-retail-shop.input';
import { UpdateAddressInput } from 'src/common/dtos/address/update-address.input';

@InputType()
export class UpdateRetailShopInput extends PartialType(CreateRetailShopInput) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: UpdateAddressInput;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;
}
