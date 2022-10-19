import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
//util
import fileUpload from 'express-fileupload';

//db
import connectDB from './db/connect.js';

app.use(fileUpload({ useTempFiles: true, createParentPath: true }));
app.use(express.static('public'));
//routes
import errorHandlerMdw from './mdw/errorHandler.js';
import authRoutes from './routes/auth.js';
import shopRoutes from './routes/publicShop.js';
import sellerRoutes from './routes/myShop.js';
import auth from './mdw/auth.js';

// body.json
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/shop', shopRoutes);
app.use('/admin', auth, sellerRoutes);
app.use('*', (req, res) => {
  return res.status(404).json({ msg: 'Route does not exist' });
});

app.use(errorHandlerMdw);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
