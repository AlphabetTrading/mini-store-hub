import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { Warehouse } from './models/warehouse.model';
import { CreateWarehouseInput } from './dto/create-warehouse.input';
import { UpdateWarehouseInput } from './dto/update-warehouse.input';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { FilterWarehouseInput } from './dto/filter-warehouse.input';
import { OrderByWarehouseInput } from './dto/warehouse-order.input';
import { PaginationInput } from 'src/common/pagination/pagination.input';
import { PaginationWarehouses } from 'src/common/pagination/pagination-info';
import { Prisma, UserRole } from '@prisma/client';
import { HasRoles } from 'src/common/decorators';
import { RolesGuard } from 'src/auth/roles.guard';

@Resolver(() => Warehouse)
@UseGuards(GqlAuthGuard)
export class WarehousesResolver {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Query(() => PaginationWarehouses, { name: 'warehouses' })
  async warehouses(
    @Args('filterWarehouseInput', {
      type: () => FilterWarehouseInput,
      nullable: true,
    })
    filterWarehouseInput?: FilterWarehouseInput,
    @Args('orderBy', {
      type: () => OrderByWarehouseInput,
      nullable: true,
    })
    orderBy?: OrderByWarehouseInput,
    @Args('paginationInput', { type: () => PaginationInput, nullable: true })
    paginationInput?: PaginationInput,
  ): Promise<PaginationWarehouses> {
    const where: Prisma.WarehouseWhereInput = {
      AND: [
        {
          id: filterWarehouseInput?.id,
        },
        {
          OR: [
            {
              name: filterWarehouseInput?.name,
            },
            {
              amharicName: filterWarehouseInput?.name,
            },
          ],
        },
        {
          createdAt: filterWarehouseInput?.createdAt,
        },
        {
          isMain: false,
        },
      ],
    };
    try {
      const warehouses = await this.warehousesService.findAll({
        where,
        orderBy,
        skip: paginationInput?.skip,
        take: paginationInput?.take,
      });
      const count = await this.warehousesService.count(where);
      return {
        items: warehouses,
        meta: {
          page: paginationInput?.skip,
          limit: paginationInput?.take,
          count,
        },
      };
    } catch (e) {
      console.log(e, 'error ');
      throw new BadRequestException('Error loading products!');
    }
  }

  @Query(() => Warehouse, { name: 'warehouse' })
  async warehouse(@Args('id') id: string): Promise<Warehouse> {
    return this.warehousesService.findOne(id);
  }

  @Query(() => [Warehouse], { name: 'warehousesByAddress' })
  async warehouseByAddress(@Args('address') address: string) {
    return this.warehousesService.findByAddress(address);
  }
  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Warehouse)
  async createWarehouse(@Args('data') data: CreateWarehouseInput) {
    return this.warehousesService.create(data);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Warehouse)
  async updateWarehouse(
    @Args('id') id: string,
    @Args('data') data: UpdateWarehouseInput,
  ) {
    return this.warehousesService.update(id, data);
  }

  @HasRoles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Mutation(() => Warehouse)
  async deleteWarehouse(@Args('id') id: string) {
    return this.warehousesService.remove(id);
  }
}
