import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGoodsTransferInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
