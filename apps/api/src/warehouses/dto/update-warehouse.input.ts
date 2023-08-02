import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateWarehouseInput } from './create-warehouse.input';
import { UpdateAddressInput } from 'src/common/dtos/address/update-address.input';

@InputType()
export class UpdateWarehouseInput extends PartialType(CreateWarehouseInput) {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  amharicName?: string;

  @Field(() => UpdateAddressInput, { nullable: true })
  address?: UpdateAddressInput;

  @Field(() => String, { nullable: true })
  warehouseManagerId?: string;
}
