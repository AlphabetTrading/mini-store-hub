import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { Category } from 'src/categories/models/category.model';
import { BaseModel } from 'src/common/models/base.model';
import { PriceHistory } from 'src/price-histories/models/price-history.model';

registerEnumType(UnitType, {
  name: 'UnitType',
  description: 'UnitType role',
});

@ObjectType()
export class Product extends BaseModel {
  @Field()
  serialNumber: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => UnitType)
  unit: UnitType;

  @Field()
  categoryId: string;

  @Field(() => Category, { nullable: true })
  category?: Category;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => PriceHistory, { nullable: true })
  ActivePrice?: PriceHistory;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
