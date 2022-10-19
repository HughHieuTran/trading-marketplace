import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  isLoading: false,
  showAlert: false,
  alertText: 'something went wrong',
  alertType: 'danger',
  showSidebar: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
    clearAlert: (state) => {
      state.alertText = 'something went wrong';
      state.alertType = 'danger';
      state.showAlert = false;
    },
    displayAlert: (state) => {
      state.showAlert = true;
    },
    setAlert: (state, { payload }) => {
      state.alertText = payload.text;
      state.alertType = payload.type;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
  },
});

export const {
  openModal,
  closeModal,
  displayAlert,
  setAlert,
  clearAlert,
  setLoading,
  stopLoading,
  toggleSidebar,
} = modalSlice.actions;

export default modalSlice.reducer;
