import { CreateUserProfileInput } from './create-user-profile.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserProfileInput extends PartialType(
  CreateUserProfileInput,
) {
  @Field({ nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
