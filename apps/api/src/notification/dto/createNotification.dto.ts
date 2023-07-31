import { InputType, Field, Float } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';
import { NotificationToken } from '../models/notification_token.model';

@InputType()
export class CreateNotificationInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;
}
