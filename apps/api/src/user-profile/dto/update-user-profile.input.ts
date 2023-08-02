import { UpdateAddressInput } from 'src/common/dtos/address/update-address.input';
import { CreateUserProfileInput } from './create-user-profile.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {
  @Field(() => String, { nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  idUrl?: string;

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: UpdateAddressInput;

  @Field(() => String, { nullable: true })
  userId?: string;
}
