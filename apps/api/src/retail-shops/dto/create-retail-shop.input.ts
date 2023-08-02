import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressInput } from 'src/common/dtos/address/create-address.input';

@InputType()
export class CreateRetailShopInput {
  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => CreateAddressInput, { nullable: true })
  address?: CreateAddressInput;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;
}
