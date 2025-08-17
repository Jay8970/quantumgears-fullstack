const mongoose = require('mongoose');  
const Product = require('./models/Product');
require('dotenv').config();

const products = [
  {
    name: 'Smartphone Stand',
    description: 'Ergonomic and adjustable stand for your smartphone.',
    price: 29.99,
    category: 'Accessories',
    stock: 50,
    image: 'stand.png',
  },
  {
    name: 'Wireless Charger',
    description: 'Fast and efficient wireless charger.',
    price: 59.99,
    category: 'Electronics',
    stock: 30,
    image: 'charger.png',
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Portable speaker with amazing sound quality.',
    price: 89.99,
    category: 'Audio',
    stock: 15,
    image: 'speaker.png',
  },
  {
    name: 'Gaming Mouse',
    description: 'Precision mouse designed for gamers.',
    price: 79.99,
    category: 'Computers',
    stock: 25,
    image: 'mouse.png',
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable brightness LED lamp for your desk.',
    price: 39.99,
    category: 'Home',
    stock: 40,
    image: 'ledDesk.png',
  },
  {
    name: 'Noise Cancelling Headphones',
    description: 'Block out the world and enjoy pure sound.',
    price: 129.99,
    category: 'Audio',
    stock: 12,
    image: 'headphone.png',
  },
  {
    name: 'Smartwatch',
    description: 'Track your fitness and stay connected.',
    price: 199.99,
    category: 'Wearables',
    stock: 18,
    image: 'smartwatch.png',
  },
  // 15 new products below
  {
    name: 'USB-C Hub',
    description: 'Expand your laptop ports with multiple connections.',
    price: 49.99,
    category: 'Computers',
    stock: 45,
    image: 'usbchub.png',
  },
  {
    name: 'Portable SSD',
    description: 'Fast and compact external solid-state drive.',
    price: 149.99,
    category: 'Storage',
    stock: 20,
    image: 'ssd.png',
  },
  {
    name: 'Mechanical Keyboard',
    description: 'Durable keyboard with tactile feedback.',
    price: 99.99,
    category: 'Computers',
    stock: 30,
    image: 'keyboard.png',
  },
  {
    name: 'Fitness Tracker',
    description: 'Monitor your daily activity and sleep patterns.',
    price: 69.99,
    category: 'Wearables',
    stock: 25,
    image: 'fitchecker.png',
  },
  {
    name: 'Smart Home Speaker',
    description: 'Voice-controlled smart speaker with assistant.',
    price: 89.99,
    category: 'Home',
    stock: 35,
    image: 'homespeaker.png',
  },
  {
    name: '4K Monitor',
    description: 'Ultra HD monitor for stunning visuals.',
    price: 299.99,
    category: 'Computers',
    stock: 10,
    image: 'tv.png',
  },
  {
    name: 'Wireless Earbuds',
    description: 'Compact earbuds with high-quality sound.',
    price: 79.99,
    category: 'Audio',
    stock: 40,
    image: 'earbuds.png',
  },
  {
    name: 'Laptop Backpack',
    description: 'Durable backpack with padded laptop compartment.',
    price: 59.99,
    category: 'Accessories',
    stock: 50,
    image: 'bag.png',
  },
  {
    name: 'Action Camera',
    description: 'Capture your adventures in high definition.',
    price: 179.99,
    category: 'Electronics',
    stock: 15,
    image: 'camera.png',
  },
  {
    name: 'Gaming Headset',
    description: 'Surround sound headset for immersive gaming.',
    price: 109.99,
    category: 'Audio',
    stock: 20,
    image: 'headphone.png',
  },
  {
    name: 'Wireless Keyboard',
    description: 'Compact and sleek wireless keyboard.',
    price: 49.99,
    category: 'Computers',
    stock: 30,
    image: 'wkey.png',
  },
  {
    name: 'Smart Thermostat',
    description: 'Control your home temperature remotely.',
    price: 199.99,
    category: 'Home',
    stock: 12,
    image: 'thermostate.png',
  },
  {
    name: 'VR Headset',
    description: 'Experience virtual reality with this advanced headset.',
    price: 349.99,
    category: 'Electronics',
    stock: 8,
    image: 'headset.png',
  },
  {
    name: 'Portable Projector',
    description: 'Project movies and presentations anywhere.',
    price: 249.99,
    category: 'Electronics',
    stock: 10,
    image: 'projector.png',
  },
  {
    name: 'Tablet Stand',
    description: 'Adjustable stand for tablets and e-readers.',
    price: 34.99,
    category: 'Accessories',
    stock: 40,
    image: 'stand.png',
  },
  {
    name: 'USB Flash Drive',
    description: 'Compact and fast USB 3.0 flash drive.',
    price: 19.99,
    category: 'Storage',
    stock: 100,
    image: 'usb.png',
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    await Product.deleteMany(); // Clear existing products
    await Product.insertMany(products);
    console.log(`${products.length} Products seeded`);

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

seed();
