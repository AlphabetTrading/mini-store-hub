import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateNotificationTokenInput {
  @Field(() => String, { nullable: true })
  notification_token?: string;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;

  @Field(() => String, { nullable: true })
  device_type: string;

  @Field(() => String, { nullable: true })
  userId?: string;
}
