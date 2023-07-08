import { Resolver } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';

@Resolver()
export class WarehousesResolver {
  constructor(private readonly warehousesService: WarehousesService) {}
}
