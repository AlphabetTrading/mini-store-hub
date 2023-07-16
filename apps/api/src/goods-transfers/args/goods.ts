import { ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { StockItem } from '../models/stock-item.model';

@ArgsType()
export class GoodsArgs {
  @IsNotEmpty()
  goods: StockItem[];
}
