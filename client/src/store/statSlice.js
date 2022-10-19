import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  stats: { available: 0, ordering: 0, sold: 0 },
  monthlyProducts: [],
  isLoading: false,
  msg: '',
};

export const getStats = createAsyncThunk(
  'stat/getStats',
  async (name, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState();
      const token = auth.token;
      const { data } = await axios.get('/admin/stats', {
        headers: { Authorization: `bearer ${token}` },
      });
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const statSlice = createSlice({
  name: 'stat',
  initialState,
  extraReducers: {
    [getStats.pending]: (state) => {
      state.isLoading = true;
    },
    [getStats.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.stats = payload.defaultStats;
      state.monthlyProducts = payload.monthlyProducts;
    },
    [getStats.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.msg = payload;
    },
  },
  reducers: {
    setStatLoading: (state) => {
      state.isLoading = true;
    },
    stopStatLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setStatLoading, stopStatLoading } = statSlice.actions;

export default statSlice.reducer;
