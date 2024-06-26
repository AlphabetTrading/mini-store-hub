import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationTokenInput {
  @Field(() => String, { nullable: true })
  notification_token?: string;

  @Field(() => String, { nullable: true })
  device_type: string;
}
