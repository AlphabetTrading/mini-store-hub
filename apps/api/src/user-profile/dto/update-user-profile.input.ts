import { CreateUserProfileInput } from './create-user-profile.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserProfileInput) {
  @Field({ nullable: true })
  photoUrl: string;
}
