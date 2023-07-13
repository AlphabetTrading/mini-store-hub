import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateNotificationTokenInput {
  @Field(() => String)
  notification_token: string;

  @Field(() => String)
  device_type: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  userId?: string;
}
