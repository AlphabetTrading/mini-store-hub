import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Notification extends BaseModel {
  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String)
  notification_token: string;

  @Field(() => String)
  status: string;

  @Field(() => User)
  createdBy?: User;
}
