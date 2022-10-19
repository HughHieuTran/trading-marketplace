import Product from '../model/Product.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../customError/index.js';
import checkPermission from '../utils/checkPermission.js';
import mongoose from 'mongoose';
import moment from 'moment';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createProduct = async (req, res) => {
  const { productName, brand } = req.body;
  const productImage = req.files.image;
  if (!productName || !brand || !req.files) {
    throw new BadRequestError('Please Provide all Values');
  }
  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Provide a image file');
  }

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  req.body.createdBy = req.user.userId;
  req.body.imageUrl = `/uploads/${productImage.name}`;
  const job = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
// ============getAllProducts ===================
export const getAllProducts = async (req, res) => {
  const { status, condition, sort, search } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
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
// ============deleteProduct ===================
export const deleteProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findOne({ _id: prodId });
  if (!product) {
    throw new NotFoundError('No product with this id');
  }
  checkPermission(req.user, product.createdBy.toString());
  await product.remove();
  res.status(StatusCodes.OK).json({ msg: 'delete Product' });
};
// ============updateProduct ===================
export const updateProduct = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findById(prodId);
  if (!product) {
    throw new NotFoundError(`No product found with ${prodId}`);
  }
  const { brand, productName } = req.body;
  if (!brand || !productName) {
    throw new BadRequestError('Please Provide All values');
  }
  if (req.files && !req.files.image.mimetype.startsWith('image')) {
    throw new BadRequestError('Please Provide a image file');
  }
  if (req.files && req.files.image) {
    const imagePath = path.join(
      __dirname,
      '../public/uploads/' + `${req.files.image.name}`
    );
    await req.files.image.mv(imagePath);
    req.body.imageUrl = `/uploads/${req.files.image.name}`;
  } else {
    req.body.imageUrl = product.imageUrl;
  }

  checkPermission(req.user, product.createdBy.toString());

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: prodId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedProduct });
};

export const getProductDetail = async (req, res) => {
  const { id: prodId } = req.params;
  const product = await Product.findById(prodId);
  if (!product) {
    throw new NotFoundError(`No product found with ${prodId}`);
  }
};

export const showStats = async (req, res) => {
  let stats = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: { _id: '$status', count: { $sum: 1 } },
    },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    available: stats.available || 0,
    ordering: stats.ordering || 0,
    sold: stats['sold out'] || 0,
  };

  let monthlyProducts = await Product.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: {
            $year: '$createdAt',
          },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);
  monthlyProducts = monthlyProducts
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyProducts });
};
