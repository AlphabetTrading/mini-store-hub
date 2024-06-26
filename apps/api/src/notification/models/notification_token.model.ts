import { ObjectType, Field } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class NotificationToken extends BaseModel {
  @Field(() => String)
  token: string;

  @Field(() => String, { nullable: true })
  device_type?: string;

  @Field(() => User, { nullable: true })
  user?: User;
}
