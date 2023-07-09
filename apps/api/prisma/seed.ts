import { Category, PrismaClient, UnitType, Warehouse } from '@prisma/client';
import { Product } from 'src/products/models/product.model';
import { RetailShop } from 'src/retail-shops/models/retail-shop.model';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  console.log('Seeding...');
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

async function seedCategories() {
  try {
    const categories = await prisma.category.createMany({
      data: [
        {
          name: 'Electronics',
          description: 'All the latest electronics products',
        },
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
    console.log('Categories seeded successfully');
    return categories;
  } catch (error) {
    console.error('Error seeding categories:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedProducts(categories: Category[]) {
  try {
    await prisma.product.createMany({
      data: [
        {
          name: 'Sunflower Oil',
          categoryId: categories[0].id,
          unit: UnitType.WEIGHT,
          description: 'Sunflower Oil',
          serialNumber: 'SN-001',
        },
        {
          name: 'Suger',
          categoryId: categories[1].id,
          unit: UnitType.WEIGHT,
          description: 'Suger',
          serialNumber: 'SN-002',
        },
        {
          name: 'Sky Soap',
          categoryId: categories[2].id,
          description: 'Sky Soap',
          serialNumber: 'SN-003',
          unit: UnitType.PIECES,
        },
      ],
    });
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedRetailShops() {
  try {
    await prisma.retailShop.createMany({
      data: [
        { name: 'Retail Shop A', address: '123 Main Street' },
        { name: 'Retail Shop B', address: '456 Elm Street' },
      ],
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
      data: [
        { name: 'Warehouse A', address: '789 Oak Street' },
        { name: 'Warehouse B', address: '321 Pine Street' },
      ],
    });
    console.log('Warehouses seeded successfully');
  } catch (error) {
    console.error('Error seeding warehouses:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedPriceHistory(products: Product[]) {
  try {
    await prisma.priceHistory.createMany({
      data: [
        {
          productId: products[0].id,
          price: 210,
          createdAt: new Date(),
          purchasedPrice: 200,
        },
        {
          productId: products[0].id,
          price: 220,
          createdAt: new Date(),
          purchasedPrice: 200,
        },
        {
          productId: products[1].id,
          price: 210,
          createdAt: new Date(),
          purchasedPrice: 200,
        },
      ],
    });
    console.log('Price history seeded successfully');
  } catch (error) {
    console.error('Error seeding price history:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedInventory(products: Product[], warehouses: Warehouse[]) {
  try {
    await prisma.productInventory.createMany({
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
          productId: products[0].id,
          warehouseId: warehouses[0].id,
          retailShopId: retailShops[0].id,
        },
        {
          productId: products[0].id,
          warehouseId: warehouses[1].id,
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
