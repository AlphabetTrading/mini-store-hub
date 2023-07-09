import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWarehouseInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;
}
