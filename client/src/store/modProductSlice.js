import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { removeProduct } from './productSlice';
import {
  clearAlert,
  displayAlert,
  setAlert,
  setLoading,
  stopLoading,
} from './modalSlice';

import axios from 'axios';
const userLocation = localStorage.getItem('location');
const token = localStorage.getItem('token');

const initialState = {
  isEditing: false,
  editProdId: '',
  productName: '',
  brand: '',
  shopLocation: userLocation || '',
  condition: 'new',
  conditionOptions: ['brand new', 'new', 'like new', 'used', 'old', 'broken'],
  status: 'available',
  statusOptions: ['available', 'sold out', 'ordering'],
};

const url = '/admin/products';
const header = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'multipart/form-data',
};

export const createProduct = createAsyncThunk(
  'modProductSlice/createProduct',
  async (product, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      await axios.post(url, product, { headers: header });
      thunkAPI.dispatch(setAlert({ text: 'Product created', type: 'success' }));
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return;
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(
        setAlert({ text: err.response.data.msg, type: 'danger' })
      );
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return;
    }
  }
);

export const editProduct = createAsyncThunk(
  'modProductSlice/editProduct',
  async (product, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const { data } = await axios.patch(`/admin/${product.prodId}`, product, {
        headers: header,
      });
      thunkAPI.dispatch(
        setAlert({ text: 'product updated successfully', type: 'success' })
      );
      thunkAPI.dispatch(displayAlert());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      thunkAPI.dispatch(stopLoading());
      return data;
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(
        setAlert({ text: err.response.data.msg, type: 'danger' })
      );
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return;
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (prodId, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      await axios.delete(`/admin/${prodId}`, { headers: header });
      thunkAPI.dispatch(setAlert({ text: 'Product deleted', type: 'success' }));
      thunkAPI.dispatch(removeProduct(prodId));
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return;
    } catch (err) {
      console.log(err);
      thunkAPI.dispatch(
        setAlert({ text: err.response.data.msg, type: 'danger' })
      );
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
      return;
    }
  }
);

const modProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    setEditProduct: (state, { payload }) => {
      state.isEditing = true;
      state.editProdId = payload._id;
      state.productName = payload.productName;
      state.brand = payload.brand;
      state.shopLocation = payload.shopLocation;
      state.condition = payload.condition;
      state.status = payload.status;
    },

    clearValue: (state) => {
      state.isEditing = false;
      state.editProdId = '';
      state.productName = '';
      state.brand = '';
      state.shopLocation = userLocation || '';
      state.condition = 'new';
      state.status = 'available';
    },
  },
});

export const { handleChange, clearValue, setEditProduct } =
  modProductSlice.actions;

export default modProductSlice.reducer;
