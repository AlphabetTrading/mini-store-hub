import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateWarehouseInput } from './create-warehouse.input';

@InputType()
export class UpdateWarehouseInput extends PartialType(CreateWarehouseInput) {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  addressId?: string;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;
}
