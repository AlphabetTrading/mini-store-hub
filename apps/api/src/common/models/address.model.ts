import { ObjectType, Field, Float, InputType } from '@nestjs/graphql';
import { BaseModel } from 'src/common/models/base.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { UserProfile } from 'src/user-profile/models/userProfile.model';
import { Warehouse } from 'src/warehouses/models/warehouse.model';

@ObjectType()
export class Address extends BaseModel {
  @Field(() => String)
  street?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  formattedAddress?: string;

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => Float, { nullable: true })
  lng?: number;

  @Field(() => RetailShop, { nullable: true })
  retailShop?: RetailShop;

  @Field(() => Warehouse, { nullable: true })
  warehouse?: Warehouse;

  @Field(() => UserProfile, { nullable: true })
  userProfile?: UserProfile;
}
