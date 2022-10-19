import fs from 'fs/promises';
import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Product from './model/Product.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();

    const jsonProducts = JSON.parse(
      await fs.readFile(new URL('./MOCK_DATA.json', import.meta.url))
    );
    await Product.create(jsonProducts);
    console.log('success');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
