import {
  ObjectType,
  Field,
  registerEnumType,
  HideField,
} from '@nestjs/graphql';

import { UserRole } from '@prisma/client';
import { Address } from 'src/common/models/address.model';
import { BaseModel } from 'src/common/models/base.model';
import { Notification } from 'src/notification/models/notification.model';
import { NotificationToken } from 'src/notification/models/notification_token.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { UserProfile } from 'src/user-profile/models/userProfile.model';
import { Warehouse } from 'src/warehouses/models/warehouse.model';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  @Field()
  username: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  amharicFirstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  amharicLastName?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => UserRole)
  role: UserRole;

  @HideField()
  password: string;

  @Field(() => UserProfile, { nullable: true })
  userProfile?: UserProfile;

  @Field(() => [Warehouse], { nullable: true })
  warehouse?: Warehouse[];

  @Field(() => [RetailShop], { nullable: true })
  retailShop?: RetailShop[];

  @Field(() => [NotificationToken], { nullable: true })
  notificationTokens?: NotificationToken[];

  @Field(() => [Notification], { nullable: true })
  notifications?: Notification[];
}
