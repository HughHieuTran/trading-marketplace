import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setLoading, stopLoading } from './modalSlice';

import axios from 'axios';

const initialState = {
  products: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  search: '',
  searchCondition: 'all',
  searchStatus: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
  productName: '',
  condition: '',
  brand: '',
  imageUrl: '',
  shopLocation: '',
};

let token = localStorage.getItem('token');

export const getProducts = createAsyncThunk(
  'product/getProducts',
  async (input, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    token = auth.token;
    const header = { Authorization: `Bearer ${token}` };
    const { isAdmin, search, searchStatus, searchCondition, sort } = input;
    let url = `/${
      isAdmin ? 'admin' : 'shop'
    }/products?status=${searchStatus}&condition=${searchCondition}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    thunkAPI.dispatch(setLoading());
    try {
      const { data } = await axios(url, { headers: header });
      thunkAPI.dispatch(stopLoading());
      return data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      console.log(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const getProductDetail = createAsyncThunk(
  'product/getProductDetail',
  async (prodId, thunkAPI) => {
    let url = `/shop/products/${prodId}`;

    thunkAPI.dispatch(setLoading());
    try {
      const { data } = await axios(url);
      thunkAPI.dispatch(stopLoading());
      return data;
    } catch (err) {
      thunkAPI.dispatch(stopLoading());
      console.log(err);
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.totalProducts = payload.totalProducts;
    },
    [getProductDetail.fulfilled]: (state, { payload }) => {
      const { product, sellerName } = payload;
      state.brand = product.brand;
      state.productName = product.productName;
      state.condition = product.condition;
      state.status = product.status;
      state.shopLocation = product.shopLocation;
      state.imageUrl = product.imageUrl;
      state.sellerName = sellerName;
    },
  },
  reducers: {
    handleChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearFilters: (state) => {
      state.search = '';
      state.searchCondition = 'all';
      state.searchStatus = 'all';
      state.sort = 'latest';
    },
    removeProduct: (state, { payload }) => {
      state.products = state.products.filter(
        (product) => product._id !== payload
      );
    },
  },
});

export const { handleChange, clearFilters, removeProduct } =
  productSlice.actions;

export default productSlice.reducer;
