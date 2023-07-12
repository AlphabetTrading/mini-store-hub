import { PrismaClient, UnitType, Warehouse } from '@prisma/client';
import { Product } from 'src/products/models/product.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

const prisma = new PrismaClient();

async function main() {
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.retailShop.deleteMany();
  await prisma.warehouseStock.deleteMany();
  console.log('Seeding...');
  await seedUserModels();
  await seedUserProfile();
  await seedCategories();
  await seedProducts();
  await seedPriceHistory();
  await seedWarehouses();
  await seedRetailShops();
}

async function seedUserModels() {
  try {
    await prisma.user.createMany({
      data: [
        {
          username: 'admin',
          firstName: 'John',
          lastName: 'Doe',
          phone: '+251929876541',
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'ADMIN',
        },
        {
          username: 'warehouse_manager',
          firstName: 'Jane',
          lastName: 'Doe',
          phone: '+251929876542',
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'WAREHOUSE_MANAGER',
        },
        {
          username: 'retail_shop_manager',
          firstName: 'Mathew',
          lastName: 'Jackson',
          phone: '+251929876543',
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'RETAIL_SHOP_MANAGER',
        },
      ],
    });
    console.log('User models seeded successfully');
  } catch (error) {
    console.error('Error seeding user models:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedUserProfile() {
  try {
    await prisma.user.create({
      data: {
        username: 'userone',
        firstName: 'User',
        lastName: 'One',
        phone: '+251929876540',
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
        role: 'USER',
        userProfile: {
          create: {
            photoUrl: 'https://i.imgur.com/UqZ2w1J.png',
            address: {
              create: {
                street: 'St 128, Main Street',
                city: 'Kampala',
                lat: 0,
                lng: 0,
                formattedAddress: 'St 128, Main Street, Kampala',
              },
            },
          },
        },
      },
    });

    console.log('User profile seeded successfully');
  } catch (error) {
    console.error('Error seeding user profile:', error);
  }
}

async function seedCategories() {
  try {
    const categories = await prisma.category.createMany({
      data: [
        { name: 'Clothing', description: 'All the latest clothing products' },
        {
          name: 'Home & Kitchen',
          description: 'All the latest home & kitchen products',
        },
        {
          name: 'Sports',
          description: 'All the latest sports products',
        },
      ],
    });
    await prisma.category.create({
      data: {
        name: 'Electronics',
        description: 'All the latest electronics products',
        subcategories: {
          create: [
            {
              name: 'Laptops',
              description: 'Laptops',
            },
            {
              name: 'Mobile Phones',
              description: 'Mobile Phones',
            },
          ],
        },
      },
    });

    console.log('Categories seeded successfully');
    return categories;
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedProducts() {
  try {
    const categories = await prisma.category.findMany();
    const data = [
      {
        name: 'Shirt',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'Shirt',
        serialNumber: 'SN-001',
      },
      {
        name: 'Jeans',
        categoryId: categories[1].id,
        unit: UnitType.PIECES,
        description: 'Jeans',
        serialNumber: 'SN-002',
      },
      {
        name: 'Shoes',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'Shoes',
        serialNumber: 'SN-003',
      },
      {
        name: 'T-Shirt',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'T-Shirt',
        serialNumber: 'SN-004',
      },
    ];
    await prisma.product.createMany({
      data,
    });

    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedPriceHistory() {
  try {
    const product = await prisma.product.findFirst();
    await prisma.product.update({
      where: {
        id: product?.id,
      },
      data: {
        priceHistory: {
          create: {
            price: 100,
            purchasedPrice: 23,
            productCreatedAt: product.createdAt,
          },
        },
      },
    });

    console.log('Price history seeded successfully');
  } catch (error) {
    console.error('Error seeding price history:', error);
  }
}

async function seedRetailShops() {
  try {
    await prisma.retailShop.createMany({
      data: [{ name: 'Retail Shop A' }, { name: 'Retail Shop B' }],
    });
    const user = await prisma.user.findFirst({
      where: {
        role: 'RETAIL_SHOP_MANAGER',
      },
    });
    await prisma.retailShop.create({
      data: {
        name: 'Retail Shop  C',
        retailShopManager: {
          connect: {
            id: user?.id,
          },
        },
        address: {
          create: {
            street: 'St 212, Main Street',
            city: 'Kampala',
            lat: 0,
            lng: 0,
            formattedAddress: 'St 212, Main Street, Kampala',
          },
        },
      },
    });
    console.log('Retail shops seeded successfully');
  } catch (error) {
    console.error('Error seeding retail shops:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedWarehouses() {
  try {
    await prisma.warehouse.createMany({
      data: [{ name: 'Warehouse A' }, { name: 'Warehouse B' }],
    });

    await prisma.warehouse.create({
      data: {
        name: 'Warehouse C',
        address: {
          create: {
            street: 'St 128, Main Street',
            city: 'Kampala',
            lat: 0,
            lng: 0,
            formattedAddress: 'St 128, Main Street, Kampala',
          },
        },
      },
    });
    console.log('Warehouses seeded successfully');
  } catch (error) {
    console.error('Error seeding warehouses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedInventory(products: Product[], warehouses: Warehouse[]) {
  try {
    await prisma.warehouseStock.createMany({
      data: [
        {
          productId: products[0].id,
          warehouseId: warehouses[0].id,
          quantity: 10,
        },
        {
          productId: products[0].id,
          warehouseId: warehouses[1].id,
          quantity: 20,
        },
        {
          productId: products[1].id,
          warehouseId: warehouses[0].id,
          quantity: 30,
        },
      ],
    });
    console.log('Inventory seeded successfully');
  } catch (error) {
    console.error('Error seeding inventory:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedGoodsTransfer(
  products: Product[],
  warehouses: Warehouse[],
  retailShops: RetailShop[],
) {
  try {
    await prisma.goodsTransfer.createMany({
      data: [
        {
          sourceWarehouseId: warehouses[0].id,
          retailShopId: retailShops[0].id,
        },
        {
          sourceWarehouseId: warehouses[1].id,
          retailShopId: retailShops[1].id,
        },
      ],
    });
    console.log('Goods transfers seeded successfully');
  } catch (error) {
    console.error('Error seeding goods transfers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedSaleTransaction(
  products: Product[],
  warehouses: Warehouse[],
  retailShops: RetailShop[],
) {
  try {
    await prisma.saleTransaction.createMany({
      data: [
        {
          productId: products[0].id,
          price: 210,
          quantity: 2,
          retailShopId: retailShops[0].id,
        },
        {
          productId: products[0].id,
          price: 220,
          quantity: 3,
          retailShopId: retailShops[1].id,
        },
      ],
    });
    console.log('Sale transactions seeded successfully');
  } catch (error) {
    console.error('Error seeding sale transactions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
