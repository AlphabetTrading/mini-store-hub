import { InputType, Field, Float } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@InputType()
export class CreateRetailShopInput {
  @Field(() => String)
  name: string;

  @Field(() => Float)
  address: string;

  @Field(() => String, { nullable: true })
  retailShopManagerId?: string;
}
