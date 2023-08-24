import { InputType, Field } from '@nestjs/graphql';
import { UnitType } from '@prisma/client';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field()
  description: string;

  @Field(() => String, { nullable: true })
  amharicDescription?: string;

  @Field(() => UnitType)
  unit: UnitType;

  @Field()
  categoryId: string;

  @Field(() => String, { nullable: true })
  activePriceId?: string;

  @Field(() => [String], { nullable: true })
  images?: string[];
}
