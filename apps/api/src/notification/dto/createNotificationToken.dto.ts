import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNotificationTokenInput {
  @Field(() => String)
  token: string;

  @Field(() => String)
  device_type: string;

  @Field(() => String)
  userId?: string;
}
