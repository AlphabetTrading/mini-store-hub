import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';
import { ReadNotification } from './read_notification.model';
import { RecipientType } from '@prisma/client';

registerEnumType(RecipientType, {
  name: 'RecipientType',
  description: 'RecipientType',
});

@ObjectType()
export class Notification extends BaseModel {
  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  amharicTitle?: string;

  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  amharicBody?: string;

  @Field(() => RecipientType)
  recipientType: RecipientType;

  @Field(() => Boolean)
  isRead: boolean;

  @Field(() => String, { nullable: true })
  recipientId?: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => [ReadNotification], { nullable: true })
  notificationReads?: ReadNotification[];
}
