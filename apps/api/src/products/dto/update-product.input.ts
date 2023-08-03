import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  serialNumber?: string;

  @Field(() => UnitType, { nullable: true })
  unit?: UnitType;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
