import { InputType, Field, HideField } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@InputType()
export class CreateUserInput {
  @Field()
  id: string;

  @Field()
  username: string;

  // @Field(() => String, { nullable: true })
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  phone: string;

  @Field(() => UserRole)
  role: UserRole;

  @HideField()
  password: string;
}
