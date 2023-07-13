import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class sendPushNotificationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  userId?: string;
}
