import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserProfileInput {
  @Field()
  photoUrl: string;
}
