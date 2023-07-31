import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';
import { Notification } from './notification.model';

@ObjectType()
export class ReadNotification extends BaseModel {
  @Field(() => String, { nullable: true })
  userId: string;

  @Field(() => String, { nullable: true })
  notificationId: string;

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Notification, { nullable: true })
  notification?: Notification;
}
