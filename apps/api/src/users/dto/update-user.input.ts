import { UserRole } from '@prisma/client';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdateUserProfileInput } from 'src/user-profile/dto/update-user-profile.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => String, { nullable: true })
  amharicFirstName?: string;

  @Field(() => String, { nullable: true })
  amharicLastName?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => UpdateUserProfileInput, { nullable: true })
  userProfile?: UpdateUserProfileInput;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => UserRole)
  role: UserRole;
}
