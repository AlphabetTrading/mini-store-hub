import { InputType, Field, Float } from '@nestjs/graphql';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';
import { UserProfile } from 'src/user-profile/models/userProfile.model';
import { Warehouse } from 'src/warehouses/models/warehouse.model';

@InputType()
export class UpdateAddressInput {
  @Field(() => String, { nullable: true })
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
