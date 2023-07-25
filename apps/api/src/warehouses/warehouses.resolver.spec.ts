import { Test, TestingModule } from '@nestjs/testing';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehousesService } from './warehouses.service';
import { Prisma, UnitType } from '@prisma/client';
import { Warehouse } from './models/warehouse.model';

describe('WarehousesResolver', () => {
  let resolver: WarehousesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarehousesResolver, WarehousesService],
    }).compile();

    resolver = module.get<WarehousesResolver>(WarehousesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // get single Warehouse
  describe('warehouseById', () => {
    it('should return a single warehouse', async () => {
      const result: Warehouse = {
        id: '1',
        name: 'warehouse',
        amharicName: 'ዋሪሽን',
        address: {
          id: '1',
          city: 'Addis Ababa',
          street: '22',
          formattedAddress: 'Addis Ababa, 22',
          createdAt: new Date(),
          lat: 0,
          lng: 0,
          updatedAt: new Date(),
        },
        warehouseManager: {
          id: '1',
          firstName: 'first',
          lastName: 'last',
          phone: '0912345678',
          username: 'username',
          role: 'ADMIN',
          userProfile: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          password: 'password',
          amharicFirstName: 'ፊርማይስን',
          amharicLastName: 'ላስት',
        },
        warehouseStock: [
          {
            id: '1',
            quantity: 1,
            productId: '1',
            warehouseId: '1',
            createdAt: new Date(),
            updatedAt: new Date(),
            goodsTransfers: [],
            product: {
              warehouseStock: [],
              activePrice: {
                id: '1',
                price: 1,
                purchasedPrice: 1,
                productId: '',
                productCreatedAt: undefined,
                createdAt: undefined,
                updatedAt: undefined,
              },
              goods: [],
              images: [],
              priceHistory: [],
              RetailShopStock: [],
              saleTransaction: [],
              activePriceId: '1',
              category: {
                id: '1',
                name: '',
                createdAt: undefined,
                updatedAt: undefined,
              },

              id: '1',
              name: 'product',
              amharicName: 'ንጥር',
              description: 'description',
              amharicDescription: 'መግለጫ',
              createdAt: new Date(),
              updatedAt: new Date(),
              unit: UnitType.WEIGHT,
              serialNumber: '123456789',
              categoryId: '1',
            },
          },
        ],
        retailShopStock: [],
        addressId: '1',
        warehouseManagerId: '1',
        goodsTransferAsDestination: [],
        goodsTransferAsSource: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(resolver, 'warehouse').mockImplementation(async () => result);

      expect(await resolver.warehouse('1')).toBe(result);
    });
  });
});
