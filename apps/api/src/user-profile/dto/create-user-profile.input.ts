import { InputType, Field } from '@nestjs/graphql';
import { CreateAddressInput } from 'src/common/dtos/address/create-address.input';

@InputType()
export class CreateUserProfileInput {
  @Field(() => String, { nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  idUrl?: string;

  @Field(() => CreateAddressInput, { nullable: true })
  address?: CreateAddressInput;

  @Field(() => String, { nullable: true })
  userId?: string;
}
