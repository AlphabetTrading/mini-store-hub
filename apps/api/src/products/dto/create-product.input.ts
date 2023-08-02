import { InputType, Field } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => UnitType)
  unit: UnitType;

  @Field()
  categoryId: string;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
