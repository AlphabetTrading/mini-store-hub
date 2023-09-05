import { Gender, PrismaClient, TransferType, UnitType } from '@prisma/client';
import { randomInt } from 'crypto';
import { faker } from '@faker-js/faker';
const prisma = new PrismaClient();

async function main() {
  await prisma.annualTransaction.deleteMany();
  await prisma.dailyTransaction.deleteMany();
  await prisma.monthlyTransaction.deleteMany();
  await prisma.address.deleteMany();
  await prisma.notificationToken.deleteMany();
  await prisma.notificationRead.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.userProfile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.saleTransactionItem.deleteMany();
  await prisma.saleTransaction.deleteMany();
  await prisma.priceHistory.deleteMany();
  await prisma.stockItem.deleteMany();
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
          phone: '0912345671',
          amharicFirstName: 'ጆን',
          amharicLastName: 'ዶኤ',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'ADMIN',
        },
        {
          username: 'warehouse',
          firstName: 'Jane',
          lastName: 'Doe',
          phone: '0912345672',
          amharicFirstName: 'ጃን',
          amharicLastName: 'ዶኤ',
          gender: Gender.FEMALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'WAREHOUSE_MANAGER',
        },
        {
          username: 'retailshop',
          firstName: 'George',
          lastName: 'Thomas',
          phone: '0912345673',
          amharicFirstName: 'ጆርጂ',
          amharicLastName: 'ቶማስ',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'RETAIL_SHOP_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          // generate random amharic name
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'WAREHOUSE_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'WAREHOUSE_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'RETAIL_SHOP_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'RETAIL_SHOP_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phone: faker.phone.number(),
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          password:
            '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
          role: 'WAREHOUSE_MANAGER',
        },
        {
          username: faker.internet.userName(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          amharicFirstName: 'አማርኛ ስም',
          amharicLastName: 'አማርኛ የአባት ስም',
          gender: Gender.MALE,
          phone: faker.phone.number(),
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
        // generate a random first name, last name, and phone number, and randomize the username
        username: faker.internet.userName(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        phone: faker.phone.number(),
        amharicFirstName: 'አማርኛ ስም',
        amharicLastName: 'አማርኛ የአባት ስም',
        gender: Gender.MALE,
        password:
          '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm',
        role: 'WAREHOUSE_MANAGER',
        userProfile: {
          create: {
            photoUrl: 'https://i.imgur.com/UqZ2w1J.png',
            address: {
              create: {
                street: faker.location.street(),
                city: faker.location.city(),
                lat: faker.location.latitude(),
                lng: faker.location.longitude(),
                formattedAddress: faker.location.secondaryAddress(),
                amharicFormattedAddress: 'አማርኛ አገር በአማርኛ አገር በአማርኛ አገር',
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
          amharicDescription: 'ሁሉም የቤት እና የቤት መድብሎች እቃዎች',
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
      ],
    });
    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        amharicName: 'ኤሌክትሮኒክስ',
        description: faker.commerce.department(),
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
      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[0].id,
        unit: UnitType.PIECES,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[1].id,
        unit: UnitType.BOTTLE,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[2].id,
        unit: UnitType.LITER,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[3].id,
        unit: UnitType.METER,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[2].id,
        unit: UnitType.LITER,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[3].id,
        unit: UnitType.METER,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[4].id,
        unit: UnitType.METER,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),

      // generate 10 products
      ...Array.from({ length: 5 }, () => ({
        name: faker.commerce.productName(),
        amharicName: 'ስዊትር ጫማ',
        categoryId: categories[5].id,
        unit: UnitType.KG,
        description: faker.commerce.productDescription(),
        serialNumber: generateSerialNumber(),
      })),
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
  const warehouse = await prisma.warehouse.findFirst({
    where: {
      isMain: false,
    },
  });
  try {
    const user = await prisma.user.findFirst({
      where: {
        role: 'RETAIL_SHOP_MANAGER',
      },
    });
    const products = await prisma.product.findMany();

    await prisma.retailShop.create({
      data: {
        name: faker.company.name(),
        retailShopManager: {
          connect: {
            id: user?.id,
          },
        },
        retailShopStock: {
          createMany: {
            data: [
              {
                warehouseId: warehouse.id,
                quantity: 10,
                maxQuantity: 50,
                productId: products[0].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 20,
                maxQuantity: 50,
                productId: products[1].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[2].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 10,
                maxQuantity: 50,
                productId: products[3].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 20,
                maxQuantity: 50,
                productId: products[6].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[7].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 10,
                maxQuantity: 50,
                productId: products[8].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 20,
                maxQuantity: 50,
                productId: products[10].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[11].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[12].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[14].id,
              },
              {
                warehouseId: warehouse.id,
                quantity: 30,
                maxQuantity: 50,
                productId: products[15].id,
              },
            ],
          },
        },
        address: {
          create: {
            street: faker.location.street(),
            city: faker.location.city(),
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
            formattedAddress: faker.location.secondaryAddress(),
          },
        },
      },
    });
    await prisma.retailShop.createMany({
      data: [
        { name: faker.company.name(), amharicName: 'የሚከተለው የስራ ቦታ' },
        { name: faker.company.name(), amharicName: 'የሚከተለው የስራ ቦታ' },
        { name: faker.company.name(), amharicName: 'የሚከተለው የስራ ቦታ' },
        { name: faker.company.name(), amharicName: 'የሚከተለው የስራ ቦታ' },
        {
          name: faker.company.name(),
          amharicName: 'የሚከተለው የስራ ቦታ',
        },
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
    // Create main warehouse
    await prisma.warehouse.create({
      data: {
        name: 'Main Warehouse',
        isMain: true,
        address: {
          create: {
            street: faker.location.street(),
            city: faker.location.city(),
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
            formattedAddress: faker.location.secondaryAddress(),
            amharicFormattedAddress: 'የሚከተለው የስራ ቦታ',
          },
        },
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        role: 'WAREHOUSE_MANAGER',
      },
    });
    await prisma.warehouse.create({
      data: {
        name: faker.company.name(),
        warehouseManager: {
          connect: {
            id: user?.id,
          },
        },
        address: {
          create: {
            street: faker.location.street(),
            city: faker.location.city(),
            lat: faker.location.latitude(),
            lng: faker.location.longitude(),
            formattedAddress: faker.location.secondaryAddress(),
            amharicFormattedAddress: 'የሚከተለው የስራ ቦታ',
          },
        },
      },
    });

    await prisma.warehouse.createMany({
      data: [
        { name: faker.company.name() },
        { name: faker.company.name() },
        { name: faker.company.name() },
      ],
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

    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 5 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {}
    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 5 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {}
    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 5 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {}
    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 5 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {
      console.error(error);
    }
    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 30 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {
      console.error(error);
    }
    try {
      await prisma.warehouseStock.createMany({
        data: [
          ...Array.from({ length: 30 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: 50,
          })),
        ],
      });
    } catch (error) {}
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

    try {
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
          {
            productId: products[0].id,
            retailShopId: retailshops[1].id,
            quantity: 10,
            warehouseId: warehouses[0].id,
            maxQuantity: 50,
          },
          {
            productId: products[1].id,
            retailShopId: retailshops[1].id,
            quantity: 20,
            warehouseId: warehouses[0].id,
            maxQuantity: 50,
          },
          {
            productId: products[2].id,
            retailShopId: retailshops[1].id,
            quantity: 30,
            warehouseId: warehouses[0].id,
            maxQuantity: 50,
          },
          ...Array.from({ length: 30 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            retailShopId: retailshops[randomInt(0, retailshops.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: randomInt(0, 30),
          })),
        ],
      });
    } catch (error) {}

    try {
      await prisma.retailShopStock.createMany({
        data: [
          ...Array.from({ length: 30 }, () => ({
            productId: products[randomInt(0, products.length - 1)].id,
            retailShopId: retailshops[randomInt(0, retailshops.length - 1)].id,
            warehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
            quantity: randomInt(0, 30),
            maxQuantity: randomInt(0, 30),
          })),
        ],
      });
    } catch (error) {}

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
        ...Array.from({ length: 20 }, () => ({
          sourceWarehouseId: warehouses[randomInt(0, warehouses.length - 1)].id,
          retailShopId: retailShops[randomInt(0, retailShops.length - 1)].id,
          transferType: 'WarehouseToRetailShop' as TransferType,
        })),
        ...Array.from({ length: 5 }, () => ({
          sourceWarehouseId:
            warehouses[randomInt(0, Math.floor(warehouses.length / 2) - 1)].id,
          destinationWarehouseId:
            warehouses[
              randomInt(
                Math.floor(warehouses.length / 2),
                retailShops.length - 1,
              )
            ].id,
          transferType: 'WarehouseToWarehouse' as TransferType,
        })),

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
    const products = await prisma.product.findMany({
      include: {
        activePrice: true,
      },
    });

    for (let i = 0; i < 20; i++) {
      await prisma.saleTransaction.create({
        data: {
          retailShopId: retailShops[randomInt(0, retailShops.length - 1)].id,
          saleTransactionItems: {
            createMany: {
              data: [
                {
                  productId: products[randomInt(0, products.length - 1)].id,
                  quantity: 2,
                  subTotal:
                    products[randomInt(0, products.length - 1)].activePrice
                      .price * 2,
                  soldPriceHistoryId:
                    products[randomInt(0, products.length - 1)].activePrice?.id,
                },
              ],
            },
          },
          totalPrice: Number(faker.finance.amount()),
        },
      });
    }

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
          title: faker.lorem.sentence(),
          body: faker.lorem.words({ min: 10, max: 20 }),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          recipientType: 'USER',
          isRead: false,
          recipientId: user?.id,
        },
        {
          title: faker.lorem.sentence(),
          body: faker.lorem.words({ min: 10, max: 20 }),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          recipientType: 'USER',
          isRead: true,
          recipientId: user?.id,
        },
        {
          title: faker.word.words(3),
          body: faker.word.words(10),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          isRead: false,
          recipientType: 'ALL',
        },
        {
          title: faker.word.words(3),
          body: faker.word.words(10),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          isRead: false,
          recipientType: 'RETAIL_SHOP',
        },
        {
          title: faker.word.words(3),
          body: faker.word.words(10),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          isRead: false,
          recipientType: 'WAREHOUSE',
        },
        {
          title: faker.word.words(3),
          body: faker.word.words(10),
          amharicTitle: 'የእቃ አይነት የለም',
          amharicBody: 'የእቃ አይነት የለም',
          isRead: true,
          recipientType: 'RETAIL_SHOP',
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
