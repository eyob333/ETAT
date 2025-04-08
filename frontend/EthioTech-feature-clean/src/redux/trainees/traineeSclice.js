/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../app/api/baseApi';

export const fetchTrainees = createAsyncThunk('trainees/fetchTrainees', async (thunkAPI) => {
  const url = `${baseURL}/enrolled-training`;
  try {
    const response = await axios.get(url);
    return response.data.enrollment;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  trainees: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const traineeSlice = createSlice({

  name: 'trainee',
  initialState,
  reducers: {
    removeJobApplication: (state, action) => {
      state.trainees = state.trainees.filter((service) => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchTrainees.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTrainees.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainees = action.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt); // Convert the start dates to Date objects
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Compare the dates
        });
      })
      .addCase(fetchTrainees.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  removeJobApplication,
} = traineeSlice.actions;
export default traineeSlice.reducer;
