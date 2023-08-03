import { PrismaClient, UnitType } from '@prisma/client';
import { randomInt } from 'crypto';
import { Cuid, UUID } from 'graphql-scalars/typings/mocks';

const prisma = new PrismaClient();

async function main() {
  await prisma.notificationToken.deleteMany();
  await prisma.notificationRead.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.saleTransactionItem.deleteMany();
  await prisma.saleTransaction.deleteMany();
  await prisma.goodsTransfer.deleteMany();
  await prisma.warehouseStock.deleteMany();
  await prisma.retailShopStock.deleteMany();
  await prisma.warehouse.deleteMany();
  await prisma.retailShop.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Seeding...');

  await seedUserModels();
  await seedUserProfile();
  await seedCategories();
  await seedProducts();
  await seedPriceHistory();
  await seedWarehouses();
  await seedRetailShops();
  await seedWarehouseStocks();
  await seedRetailshopStocks();
  await seedGoodsTransfers();
  await seedSaleTransactions();
  await seedNotifications();
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
        {
          name: 'Clothing',
          amharicName: 'አልባሳት',
          description: 'All the latest clothing products',
          amharicDescription: 'ሁሉም የአልባሳት እቃዎች',
        },
        {
          name: 'Home & Kitchen',
          amharicName: 'ቤት እና የቤት መድብሎች',
          description: 'All the latest home & kitchen products',
        },
        {
          name: 'Sports',
          amharicName: 'ስፖርት',
          description: 'All the latest sports products',
          amharicDescription: 'ሁሉም የስፖርት እቃዎች',
        },

        // grocery shop item category
        {
          name: 'Beverages',
          amharicName: 'መጠጥ የሚያስገባ',
          description: 'All the latest beverages products',
          amharicDescription: 'ሁሉም የመጠጥ እቃዎች',
        },
        {
          name: 'Bread & Bakery',
          amharicName: 'ዳቦ እና ቤኪሊ',
          description: 'All the latest bread & bakery products',
          amharicDescription: 'ሁሉም የዳቦ እና ቤኪሊ እቃዎች',
        },
        // super market item category
        {
          name: 'Fruits & Vegetables',
          amharicName: 'ተክል እና በረከት',
          description: 'All the latest fruits & vegetables products',
          amharicDescription: 'ሁሉም የተክል እና በረከት እቃዎች',
        },
        {
          name: 'Meat & Fish',
          amharicName: 'ፈረንጅ፣ ዓሣ እና አስተናጋጅ',
          description: 'All the latest meat & fish products',
          amharicDescription: 'ሁሉም የፈረንጅ፣ ዓሣ እና አስተናጋጅ እቃዎች',
        },
        {
          name: 'Dairy & Eggs',
          amharicName: 'የተወለደ የብርሃን እና የዝንባቡ እጥረት',
          description: 'All the latest dairy & eggs products',
          amharicDescription: 'ሁሉም የተወለደ የብርሃን እና የዝንባቡ እጥረት እቃዎች',
        },
        {
          name: 'Biscuits, Snacks & Chocolates',
          amharicName: 'ቢስክት፣ ስናክስ እና ቸኮሌት',
          description: 'All the latest biscuits, snacks & chocolates products',
          amharicDescription: 'ሁሉም የቢስክት፣ ስናክስ እና ቸኮሌት እቃዎች',
        },
        {
          name: 'Cooking Oil & Ghee',
          amharicName: 'የምግብ ዘይት እና ጉድ',
          description: 'All the latest cooking oil & ghee products',
          amharicDescription: 'ሁሉም የምግብ ዘይት እና ጉድ እቃዎች',
        },
        {
          name: 'Breakfast Cereals',
          amharicName: 'የማዳን ዝንባቡ እና የማዳን ዘይት',
          description: 'All the latest breakfast cereals products',
          amharicDescription: 'ሁሉም የማዳን ዝንባቡ እና የማዳን ዘይት እቃዎች',
        },
        {
          name: 'Rice, Pasta & Noodles',
          amharicName: 'ሩዝ፣ ፓስታ እና ኖድልስ',
          description: 'All the latest rice, pasta & noodles products',
          amharicDescription: 'ሁሉም የሩዝ፣ ፓስታ እና ኖድልስ እቃዎች',
        },
      ],
    });
    await prisma.category.create({
      data: {
        name: 'Electronics',
        amharicName: 'ኤሌክትሮኒክስ',
        description: 'All the latest electronics products',
        amharicDescription: 'ሁሉም የኤሌክትሮኒክስ እቃዎች',
        subcategories: {
          create: [
            {
              name: 'Laptops',
              amharicName: 'ላፕቶፕቶች',
              description: 'Laptops',
              amharicDescription: 'ላፕቶፕቶች',
            },
            {
              name: 'Mobile Phones',
              amharicName: 'ሞባይል ፎንሎች',
              description: 'Mobile Phones',
              amharicDescription: 'ሞባይል ፎንሎች',
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
  // Pad the currentSerialNumber with leading zeros to ensure it's 4 digits
  let currentSerialNumber = 1;
  function generateSerialNumber(): string {
    // Pad the currentSerialNumber with leading zeros to ensure it's 4 digits
    const paddedSerialNumber = currentSerialNumber.toString().padStart(4, '0');

    // Increment the currentSerialNumber for the next call
    currentSerialNumber++;

    return paddedSerialNumber;
  }
  try {
    const categories = await prisma.category.findMany();
    const products = [
      {
        name: 'Shirt',
        amharicName: 'ሸሚዝ',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'Shirt',
        serialNumber: generateSerialNumber(),
      },
      {
        name: 'Jeans',
        amharicName: 'ጅንስ',
        categoryId: categories[1].id,
        unit: UnitType.PIECES,
        description: 'Jeans',
        serialNumber: generateSerialNumber(),
      },
      {
        name: 'Shoes',
        amharicName: 'አልባሳት ጫማ',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'Shoes',
        serialNumber: generateSerialNumber(),
      },
      {
        name: 'T-Shirt',
        amharicName: 'ቲ-ሸሚዝ',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'T-Shirt',
        serialNumber: generateSerialNumber(),
      },
      {
        name: 'Sweater',
        amharicName: 'ስዊትር',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: 'Sweater',
        serialNumber: generateSerialNumber(),
      },
    ];

    for (const product of products) {
      const createdProduct = await prisma.product.create({
        data: {
          ...product,
        },
      });
      await prisma.product.update({
        where: {
          id: createdProduct.id,
        },
        data: {
          name: product.name,
          serialNumber: product.serialNumber,
          unit: product.unit,
          amharicName: product.amharicName,
          description: product.description,
          category: {
            connect: {
              id: product.categoryId,
            },
          },
          activePrice: {
            create: {
              product: {
                connect: {
                  id: createdProduct.id,
                },
              },
              price: randomInt(10, 30),
              purchasedPrice: randomInt(5, 20),
            },
          },
          priceHistory: {
            createMany: {
              data: [
                {
                  price: randomInt(10, 30),
                  purchasedPrice: randomInt(5, 20),
                },
                {
                  price: randomInt(10, 30),
                  purchasedPrice: randomInt(5, 20),
                },
              ],
            },

            // create: {
            //   price: randomInt(10, 30),
            //   purchasedPrice: randomInt(5, 20),
            // },
          },
        },
      });
    }

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
          createMany: {
            data: [
              {
                price: 100,
                purchasedPrice: 89,
              },
              {
                price: 200,
                purchasedPrice: 189,
              },
            ],
          },
        },
      },
    });

    const priceHistory = await prisma.priceHistory.findFirst({
      where: {
        productId: product?.id,
      },
    });
    // update the product's active price
    await prisma.product.update({
      where: {
        id: product?.id,
      },
      data: {
        activePrice: {
          connect: {
            id: priceHistory.id,
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
    // Create main warehouse
    await prisma.warehouse.create({
      data: {
        name: 'Main Warehouse',
        isMain: true,
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

    await prisma.warehouse.createMany({
      data: [
        { name: 'Warehouse A' },
        { name: 'Warehouse B' },
        { name: 'Warehouse D' },
      ],
    });

    const user = await prisma.user.findFirst({
      where: {
        role: 'WAREHOUSE_MANAGER',
      },
    });
    await prisma.warehouse.create({
      data: {
        name: 'Warehouse C',
        warehouseManager: {
          connect: {
            id: user?.id,
          },
        },
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

async function seedWarehouseStocks() {
  try {
    const products = await prisma.product.findMany();
    const warehouses = await prisma.warehouse.findMany({
      where: {
        isMain: false,
      },
    });

    await prisma.warehouseStock.createMany({
      data: [
        {
          productId: products[0].id,
          warehouseId: warehouses[0].id,
          quantity: 10,
        },
        {
          productId: products[1].id,
          warehouseId: warehouses[0].id,
          quantity: 20,
        },
        {
          productId: products[2].id,
          warehouseId: warehouses[0].id,
          quantity: 30,
        },
      ],
    });
    console.log('Warehouses stock is seeded successfully');
  } catch (error) {
    console.error('Error seeding warehouses stock', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedRetailshopStocks() {
  try {
    const products = await prisma.product.findMany();
    const retailshops = await prisma.retailShop.findMany();
    const warehouses = await prisma.warehouse.findMany();

    await prisma.retailShopStock.createMany({
      data: [
        {
          productId: products[0].id,
          retailShopId: retailshops[0].id,
          quantity: 10,
          warehouseId: warehouses[0].id,
          maxQuantity: 50,
        },
        {
          productId: products[1].id,
          retailShopId: retailshops[0].id,
          quantity: 20,
          warehouseId: warehouses[0].id,
          maxQuantity: 50,
        },
        {
          productId: products[2].id,
          retailShopId: retailshops[0].id,
          quantity: 30,
          warehouseId: warehouses[0].id,
          maxQuantity: 50,
        },
      ],
    });

    await prisma.retailShopStock.create({
      data: {
        retailShop: {
          connect: {
            id: retailshops[2].id,
          },
        },
        product: {
          connect: {
            id: products[2].id,
          },
        },
        maxQuantity: 25,
        quantity: 22,
        warehouse: {
          connect: {
            id: warehouses[0].id,
          },
        },
      },
    });
    console.log('Retailshops stock is seeded successfully');
  } catch (error) {
    console.error('Error seeding retailshops stock:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedGoodsTransfers() {
  try {
    const warehouses = await prisma.warehouse.findMany();
    const retailShops = await prisma.retailShop.findMany();

    await prisma.goodsTransfer.createMany({
      data: [
        {
          sourceWarehouseId: warehouses[0].id,
          retailShopId: retailShops[0].id,
          transferType: 'WarehouseToRetailShop',
        },
        {
          sourceWarehouseId: warehouses[1].id,
          retailShopId: retailShops[1].id,
          transferType: 'WarehouseToRetailShop',
        },
      ],
    });

    await prisma.goodsTransfer.create({
      data: {
        sourceWarehouse: {
          connect: {
            id: warehouses[0].id,
          },
        },
        retailShop: {
          connect: {
            id: retailShops[0].id,
          },
        },
        transferType: 'WarehouseToRetailShop',
      },
    });

    console.log('Goods transfers seeded successfully');
  } catch (error) {
    console.error('Error seeding goods transfers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedSaleTransactions() {
  try {
    const retailShops = await prisma.retailShop.findMany();
    const product = await prisma.product.findFirst({
      include: {
        activePrice: true,
      },
    });

    await prisma.saleTransaction.create({
      data: {
        retailShopId: retailShops[0].id,
        saleTransactionItems: {
          createMany: {
            data: [
              {
                productId: product.id,
                quantity: 2,
                subTotal: 200,
                soldPriceHistoryId: product.activePrice?.id,
              },
            ],
          },
        },
        totalPrice: 800,
      },
    });

    console.log('Sale transactions seeded successfully');
  } catch (error) {
    console.error('Error seeding sale transactions:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function seedNotifications() {
  try {
    const user = await prisma.user.findFirst({
      where: {
        role: 'WAREHOUSE_MANAGER',
      },
    });

    await prisma.notification.createMany({
      data: [
        {
          title: 'Product is out of stock',
          body: 'Product is out of stock',
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          recipientType: 'USER',
          isRead: false,
          recipientId: user?.id,
        },
        {
          title: 'Product is out of stock',
          body: 'Product is out of stock',
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          isRead: false,
          recipientType: 'ALL',
        },
      ],
    });
    console.log('Notifications seeded successfully');
  } catch (error) {
    console.error('Error seeding notifications:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
