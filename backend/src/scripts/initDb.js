const { MongoClient } = require('mongodb');
require('dotenv').config();

const sampleCategories = [
  { name: 'Electronics', description: 'Electronic devices and accessories' },
  { name: 'Clothing', description: 'Fashion and apparel' },
  { name: 'Books', description: 'Books and literature' },
  { name: 'Home & Garden', description: 'Home decor and gardening items' }
];

const sampleProducts = [
  {
    name: 'Smartphone',
    description: 'Latest model smartphone',
    price: 699.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200',
    rating: 4.5
  },
  {
    name: 'Laptop',
    description: 'High-performance laptop',
    price: 1299.99,
    category: 'Electronics',
    image: 'https://via.placeholder.com/200',
    rating: 4.8
  },
  {
    name: 'T-Shirt',
    description: 'Cotton casual t-shirt',
    price: 19.99,
    category: 'Clothing',
    image: 'https://via.placeholder.com/200',
    rating: 4.0
  }
];

async function initializeDb() {
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('ecommerce');

    // Clear existing data
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});

    // Insert sample data
    await db.collection('categories').insertMany(sampleCategories);
    await db.collection('products').insertMany(sampleProducts);

    console.log('Sample data inserted successfully');
    await client.close();
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDb(); 