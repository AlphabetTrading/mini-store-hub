import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field({ nullable: true })
  photoUrl?: string;
}
