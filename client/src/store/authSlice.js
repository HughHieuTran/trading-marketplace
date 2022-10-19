import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  clearAlert,
  displayAlert,
  setAlert,
  setLoading,
  stopLoading,
} from './modalSlice';
import axios from 'axios';

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const url = '/auth/';
const header = { Authorization: `Bearer ${token}` };

export const setupUser = createAsyncThunk(
  'auth/createUser',
  async ({ currentUser, link }, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const { data } = await axios.post(url + link, currentUser);
      thunkAPI.dispatch(
        setAlert({ text: 'successfull, redirecting...', type: 'success' })
      );
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
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

export const updateUser = createAsyncThunk(
  'auth/createUser',
  async (currentUser, thunkAPI) => {
    thunkAPI.dispatch(setLoading());
    try {
      const { data } = await axios.patch('/auth/updateUser', currentUser, {
        headers: header,
      });
      thunkAPI.dispatch(setAlert({ text: 'user updated', type: 'success' }));
      thunkAPI.dispatch(displayAlert());
      thunkAPI.dispatch(stopLoading());
      setTimeout(() => {
        thunkAPI.dispatch(clearAlert());
      }, 3000);
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

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  userLocation: userLocation || '',
  shopLocation: userLocation || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('location');
      state.user = null;
      state.token = null;
      state.userLocation = '';
      state.shopLocation = '';
    },
  },
  extraReducers: {
    [setupUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.user));
      localStorage.setItem('token', payload.token);
      localStorage.setItem('location', payload.location);
      state.user = payload.user;
      state.token = payload.token;
      state.userLocation = payload.location;
      state.shopLocation = payload.location;
    },
    [updateUser.fulfilled]: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload.user));
      localStorage.setItem('token', payload.token);
      localStorage.setItem('location', payload.location);
      state.user = payload.user;
      state.token = payload.token;
      state.userLocation = payload.location;
      state.shopLocation = payload.location;
    },
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
