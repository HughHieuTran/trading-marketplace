import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

const url = '/shop/cart';

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;
    const header = { Authorization: `bearer ${token}` };
    try {
      const { data } = await axios(url, { headers: header });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async (productId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;

    const header = { Authorization: `Bearer ${token}` };
    try {
      await axios.post(url, { productId }, { headers: header });
      thunkAPI.dispatch(getCartItems());
      return;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (productId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;

    const header = { Authorization: `Bearer ${token}` };
    try {
      await axios.delete(url, { data: { productId }, headers: header });
      thunkAPI.dispatch(getCartItems());
      return;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (productId, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    const token = auth.token;

    const header = { Authorization: `Bearer ${token}` };
    try {
      await axios.patch(url, { productId }, { headers: header });
      thunkAPI.dispatch(getCartItems());
      return;
    } catch (err) {
      console.log(err.response.data.msg);
    }
  }
);

const initialState = {
  cartItems: [],
  total: 0,
  showCartModal: false,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.cartItems = payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
  reducers: {
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      cartItem.amount = cartItem.amount + 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload);
      if (cartItem.amount === 1) return;
      cartItem.amount = cartItem.amount - 1;
    },
    calculateTotal: (state) => {
      let total = 0;
      state.cartItems.forEach((item) => {
        total += item.quantity;
      });
      state.total = total;
    },
    calculateAmount: (state) => {
      state.amount = state.cartItems.length;
    },
    openCartModal: (state) => {
      state.showCartModal = true;
    },
    closeCartModal: (state) => {
      state.showCartModal = false;
    },
  },
});

export const {
  removeItem,
  increase,
  decrease,
  calculateTotal,
  calculateAmount,
  openCartModal,
  closeCartModal,
} = cartSlice.actions;

export default cartSlice.reducer;
