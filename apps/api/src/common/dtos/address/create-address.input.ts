import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateAddressInput {
  @Field(() => String, { nullable: true })
  street?: string;

  @Field(() => String, { nullable: true })
  city?: string;

  @Field(() => String, { nullable: true })
  formattedAddress?: string;

  @Field(() => String, { nullable: true })
  amharicFormattedAddress?: string;

  @Field(() => Float, { nullable: true })
  lat?: number;

  @Field(() => Float, { nullable: true })
  lng?: number;
}
