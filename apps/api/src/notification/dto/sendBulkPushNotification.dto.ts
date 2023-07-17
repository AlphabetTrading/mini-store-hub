import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class sendBulkPushNotificationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  userIds?: string[];
}
