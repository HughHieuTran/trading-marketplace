import mongoose from 'mongoose';
import Order from '../model/Order.js';
import User from '../model/User.js';
import Product from '../model/Product.js';
import StatusCodes from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../customError/index.js';

export const getProducts = async (req, res, next) => {
  const { status, condition, sort, search } = req.query;
  const queryObject = {};
  if (status && status !== 'all') {
    queryObject.status = status;
  }
  if (condition && condition !== 'all') {
    queryObject.condition = condition;
  }
  if (search) {
    queryObject.productName = { $regex: search, $options: 'i' };
  }
  let result = Product.find(queryObject);

  // sort
  if (sort && sort === 'latest') {
    result = result.sort('-createdAt');
  }
  if (sort && sort === 'oldest') {
    result = result.sort('+createdAt');
  }
  if (sort && sort === 'a-z') {
    result = result.sort('brand');
  }
  if (sort && sort === 'z-a') {
    result = result.sort('-brand');
  }

  const products = await result;
  res
    .status(StatusCodes.OK)
    .json({ products, totalProducts: products.length, numOfPages: 1 });
};

export const getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  const product = await Product.findById(prodId);
  const user = await User.findById(product.createdBy);
  if (!product || !user) {
    throw new BadRequestError('Product not exist or seller is not available');
  }
  const sellerName = user.name;
  res.status(StatusCodes.OK).json({ product, sellerName });
};

export const getCart = async (req, res, next) => {
  const user = await User.findById(req.user.userId).populate(
    'cart.items.productId'
  );
  if (!user) {
    throw new BadRequestError('Product not exist or seller is not available');
  }
  const products = user.cart.items;
  res.status(StatusCodes.OK).json(products);
};

export const postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await User.findById(req.user.userId);
  const product = await Product.findById(prodId);
  if (!product || !user) {
    throw new BadRequestError('Product not exist or seller is not available');
  }
  await user.addToCart(product);
  res.status(StatusCodes.OK).json({ msg: 'added to cart' });
};

export const postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new BadRequestError('Product not exist or seller is not available');
  }
  await user.removeFromCart(prodId);
  res.status(StatusCodes.OK).json({ msg: 'remove from cart' });
};

export const clearCart = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new BadRequestError('Product not exist or seller is not available');
  }
  await user.clearCart();
  res.status(StatusCodes.OK).json({ msg: 'cleared cart' });
};

export const postOrder = async (req, res, next) => {
  const user = await User.findById(req.user.userId).populate(
    'cart.items.productId'
  );
  if (user.cart.items.length < 1) {
    throw new BadRequestError('Your cart is empty');
  }
  const products = user.cart.items.map((item) => {
    return { quantity: item.quantity, product: { ...item.productId._doc } };
  });
  const order = new Order({
    user: {
      email: user.email,
      userId: user._id,
    },
    products: products,
  });
  await order.save();

  await user.clearCart();
  res.status(StatusCodes.OK).json({ msg: 'post Order' });
};

export const getOrders = async (req, res, next) => {
  const order = await Order.find({ 'user.userId': req.user.userId });
  if (!order) {
    res.status(StatusCodes.OK).json({ orders: [] });
  }
  res.status(StatusCodes.OK).json({ order });
};
