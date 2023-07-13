import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class NotificationToken extends BaseModel {
  @Field(() => String)
  notification_token: string;

  @Field(() => String)
  device_type: string;

  @Field(() => User)
  user?: User;
}
