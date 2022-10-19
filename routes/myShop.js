import {
  createProduct,
  getAllProducts,
  showStats,
  deleteProduct,
  updateProduct,
  getProductDetail,
} from '../controller/adminController.js';

import express from 'express';

const router = express.Router();

router.route('/products').post(createProduct).get(getAllProducts);

router.route('/stats').get(showStats);

router
  .route('/:id')
  .delete(deleteProduct)
  .patch(updateProduct)
  .get(getProductDetail);

export default router;
