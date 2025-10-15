import { faker } from '@faker-js/faker';
import { sequelize } from '../database/connection';

// Importa todos tus modelos
import { Client } from '../models/Client';
import { Seller } from '../models/Seller';
import { Category } from '../models/Category';
import { Tag } from '../models/Tag';
import { Product } from '../models/Product';
import { ProductTag } from '../models/ProductTag';
import { Order } from '../models/Order';
import { OrderDetail } from '../models/OrderDetail';
import { Review } from '../models/Review';
import { Payment } from '../models/Payment';
import { Shipment } from '../models/Shipment';

const createFakeData = async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // ¡CUIDADO! `force: true` borrará todas las tablas y las volverá a crear.
    // Úsalo solo en desarrollo.
    console.log('Syncing database schema (this will delete all existing data)...');
    await sequelize.sync({ force: true });
    console.log('Database schema synced.');

    // --- CREACIÓN DE DATOS FALSOS ---

    // 1. Crear Vendedores (Sellers)
    const sellersData = Array.from({ length: 10 }).map(() => ({
      name: faker.company.name(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      password: 'password123', // El hook se encargará de hashearlo
      code: faker.string.alphanumeric(10).toUpperCase(), // Añadido para coincidir con el modelo Seller
      status: 'ACTIVE',
    }));
    const sellers = await Seller.bulkCreate(sellersData);
    console.log(`✅ ${sellers.length} sellers created.`);

    // 2. Crear Categorías
    const categoriesData = ['Electrónica', 'Ropa y Accesorios', 'Hogar y Cocina', 'Deportes', 'Libros'].map(name => ({ name, status: 'ACTIVE' }));
    const categories = await Category.bulkCreate(categoriesData);
    console.log(`✅ ${categories.length} categories created.`);

    // 2.5 Crear Tags
    const tagsData = ['Oferta', 'Nuevo', 'Más Vendido', 'Electrónico', 'Verano', 'Invierno', 'Deportivo'].map(name => ({ name, status: 'ACTIVE' }));
    const tags = await Tag.bulkCreate(tagsData);
    console.log(`✅ ${tags.length} tags created.`);


    // 3. Crear Clientes
    const clientsData = Array.from({ length: 25 }).map(() => ({
      name: faker.person.fullName(),
      address: faker.location.streetAddress(),
      email: faker.internet.email().toLowerCase(),
      password: 'password123', // El hook se encargará de hashearlo
      code: faker.string.alphanumeric(10).toUpperCase(),
      status: 'ACTIVE',
    }));
    const clients = await Client.bulkCreate(clientsData);
    console.log(`✅ ${clients.length} clients created.`);

    // 4. Crear Productos
    const productsData = Array.from({ length: 100 }).map(() => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      id_seller: faker.helpers.arrayElement(sellers).id, // Correcto
      id_category: faker.helpers.arrayElement(categories).id, // Correcto
      status: 'ACTIVE',
    }));
    const products = await Product.bulkCreate(productsData);
    console.log(`✅ ${products.length} products created.`);

    // 4.5. Asociar Tags a Productos (ProductTag)
    const productTagsData = [];
    for (const product of products) {
        const tagsToAssign = faker.helpers.arrayElements(tags, { min: 1, max: 3 });
        for (const tag of tagsToAssign) {
            productTagsData.push({ id_product: product.id, id_tag: tag.id, status: 'ACTIVE' });
        }
    }
    await ProductTag.bulkCreate(productTagsData, { ignoreDuplicates: true });
    console.log(`✅ ${productTagsData.length} product-tag associations created.`);


    // 5. Crear Órdenes y sus Detalles, Pagos y Envíos
    const ordersData = [];
    const orderDetailsData = [];
    const paymentsData = [];
    const shipmentsData = [];

    for (let i = 0; i < 50; i++) {
      const client = faker.helpers.arrayElement(clients);
      let orderTotal = 0;
      const productsInOrder = faker.helpers.arrayElements(products, { min: 1, max: 4 });

      const order = {
        id_client: client.id,
        fecha: faker.date.past({ years: 1 }),
        total: 0, // Se calculará después
        status: faker.helpers.arrayElement(['PENDING', 'PAID', 'SHIPPED']),
        statuss: 'ACTIVE',
      };
      const createdOrder = await Order.create(order);

      for (const product of productsInOrder) {
        const quantity = faker.number.int({ min: 1, max: 3 });
        const price = product.price;
        orderTotal += quantity * price;
        orderDetailsData.push({
          id_order: createdOrder.id,
          id_product: product.id,
          quantity: quantity,
          status: 'ACTIVE', // Añadido para coincidir con el modelo OrderDetail
          price: price,
        });
      }

      await createdOrder.update({ total: orderTotal });

      // Crear Pago para la orden
      paymentsData.push({
        id_order: createdOrder.id,
        method: faker.helpers.arrayElement(['Credit Card', 'PayPal', 'Bank Transfer']),
        status: 'ACTIVE',
        payment_date: faker.date.recent({ days: 10 }), // Añadido para coincidir con el modelo Payment
        amount: orderTotal,
      });

      // Crear Envío para la orden
      shipmentsData.push({
        id_order: createdOrder.id,
        fecha_envio: faker.date.recent({ days: 5 }), // Añadido para coincidir con el modelo Shipment
        status: 'ACTIVE',
        tracking_number: faker.string.alphanumeric(15).toUpperCase(),
      });
    }

    await OrderDetail.bulkCreate(orderDetailsData, { ignoreDuplicates: true });
    await Payment.bulkCreate(paymentsData);
    await Shipment.bulkCreate(shipmentsData);
    console.log(`✅ 50 orders with details, payments, and shipments created.`);

    // 6. Crear Reseñas (Reviews)
    const reviewsData = Array.from({ length: 80 }).map(() => ({
      id_product: faker.helpers.arrayElement(products).id, // Correcto
      id_client: faker.helpers.arrayElement(clients).id, // Correcto
      rating: faker.number.int({ min: 1, max: 5 }),
      comment: faker.lorem.sentence(),
      status: 'ACTIVE',
    }));
    await Review.bulkCreate(reviewsData, { ignoreDuplicates: true });
    console.log(`✅ ${reviewsData.length} reviews created.`);

    console.log('\n🚀 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Unable to seed the database:', error);
  } finally {
    await sequelize.close();
    console.log('Database connection closed.');
  }
}

createFakeData().then(() => {
    console.log('Seeding process finished.');
}).catch((error) => {
    console.error('An unexpected error occurred:', error);
});