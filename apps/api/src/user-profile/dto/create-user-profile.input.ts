import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field({ nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  idUrl: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
