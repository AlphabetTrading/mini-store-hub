import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/common/models/address.model';
import { BaseModel } from 'src/common/models/base.model';

@ObjectType()
export class UserProfile extends BaseModel {
  @Field(() => String, { nullable: true })
  photoUrl?: string;

  @Field(() => String, { nullable: true })
  idUrl?: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => Address, { nullable: true })
  address?: Address | null;
}
