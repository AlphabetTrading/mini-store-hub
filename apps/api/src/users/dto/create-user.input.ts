import { InputType, Field, HideField } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';
import { IsNotEmpty, MinLength } from 'class-validator';
import { CreateUserProfileInput } from 'src/user-profile/dto/create-user-profile.input';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  username: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  amharicFirstName?: string;

  @Field(() => String, { nullable: true })
  amharicLastName?: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Field(() => CreateUserProfileInput, { nullable: true })
  userProfile?: CreateUserProfileInput;

  @Field(() => UserRole)
  role: UserRole;
}
