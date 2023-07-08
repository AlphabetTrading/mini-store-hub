import { Module } from '@nestjs/common';
import { RetailShopsService } from './retail-shops.service';
import { RetailShopsResolver } from './retail-shops.resolver';

@Module({
  providers: [RetailShopsResolver, RetailShopsService]
})
export class RetailShopsModule {}
