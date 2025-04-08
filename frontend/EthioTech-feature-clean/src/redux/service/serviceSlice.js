import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchService = createAsyncThunk('services/fetchServices', async (thunkAPI) => {
  const url = `${baseURL}/services`;
  try {
    const response = await axios.get(url);
    return response.data.services;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  services: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const serviceSlice = createSlice({

  name: 'service',
  initialState,
  reducers: {
    addService: (state, action) => {
      state.services.push(action.payload);
    },
    updateServiceState: (state, action) => {
      const updatedService = action.payload;
      const index = state.services.findIndex((service) => service.id === updatedService.id);
      if (index !== -1) {
        state.services[index] = updatedService;
      } else {
        toast.error('something went wrong');
      }
    },
    removeService: (state, action) => {
      state.services = state.services.filter((service) => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeService, updateServiceState, addService,
} = serviceSlice.actions;
export default serviceSlice.reducer;
