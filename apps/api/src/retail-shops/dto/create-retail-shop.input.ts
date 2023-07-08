import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateRetailShopInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  address: string;
}
