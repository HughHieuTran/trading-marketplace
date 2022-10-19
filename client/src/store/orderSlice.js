import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { clearCart } from './cartSlice';

const initialState = {
  orders: [],
  isLoading: false,
  msg: '',
};

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async (name, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth.token;
      const { data } = await axios.get('/shop/order', {
        headers: { Authorization: `bearer ${token}` },
      });
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

export const postOrders = createAsyncThunk(
  'order/postOrders',
  async (name, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth.token;
      await axios.post('/shop/order', name, {
        headers: { Authorization: `bearer ${token}` },
      });
      thunkAPI.dispatch(clearCart());
      return;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  extraReducers: {
    [getOrders.pending]: (state) => {
      state.isLoading = true;
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = payload.order;
      state.isLoading = false;
    },
    [getOrders.rejected]: (state, { payload }) => {
      state.msg = payload;
    },
    [postOrders.pending]: (state) => {
      state.isLoading = true;
    },
  },
  reducers: {
    setOrderLoading: (state) => {
      state.isLoading = true;
    },
    stopOrderLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setOrderLoading, stopOrderLoading } = orderSlice.actions;

export default orderSlice.reducer;
