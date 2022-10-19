import express from 'express';
import auth from '../mdw/auth.js';

import {
  getProducts,
  getProduct,
  getCart,
  postCart,
  getOrders,
  postOrder,
  postCartDeleteProduct,
  clearCart,
} from '../controller/shopController.js';

const router = express.Router();

router.route('/products').get(getProducts);
router.route('/products/:productId').get(getProduct);

router
  .route('/cart')
  .get(auth, getCart)
  .delete(auth, postCartDeleteProduct)
  .post(auth, postCart)
  .patch(auth, clearCart);

router.route('/order').get(auth, getOrders).post(auth, postOrder);

export default router;
