import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import modalReducer from './modalSlice';
import authReducer from './authSlice';
import modProductReducer from './modProductSlice';
import getProductReducer from './productSlice';
import orderReducer from './orderSlice';
import statReducer from './statSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    modal: modalReducer,
    auth: authReducer,
    addProduct: modProductReducer,
    getProduct: getProductReducer,
    order: orderReducer,
    stat: statReducer,
  },
});
