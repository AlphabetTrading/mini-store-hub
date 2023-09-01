import { InputType, Field } from '@nestjs/graphql';
import { RecipientType } from '@prisma/client';

@InputType()
export class sendPushNotificationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  amharicTitle?: string;

  @Field(() => String, { nullable: true })
  amharicBody?: string;

  @Field(() => RecipientType)
  recipientType: RecipientType;

  @Field(() => String, { nullable: true })
  recipientId?: string;
}
