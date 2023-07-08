import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateGoodsTransferInput } from './create-goods-transfer.input';

@InputType()
export class UpdateGoodsTransferInput extends PartialType(
  CreateGoodsTransferInput,
) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
