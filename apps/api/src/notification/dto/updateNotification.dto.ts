import { InputType, Field, Float } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@InputType()
export class UpdateNotificationInput {
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
