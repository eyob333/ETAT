/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../app/api/baseApi';

export const fetchAtendee = createAsyncThunk('eventAttendee/fetchAtendee', async (thunkAPI) => {
  const url = `${baseURL}/enrolled-event`;
  try {
    const response = await axios.get(url);
    return response.data.enrollment;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  Attendee: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const eventAttendeeSlice = createSlice({

  name: 'eventAttendee',
  initialState,
  reducers: {
    removeJobApplication: (state, action) => {
      state.Attendee = state.Attendee.filter((service) => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchAtendee.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAtendee.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Attendee = action.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt); // Convert the start dates to Date objects
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Compare the dates
        });
      })
      .addCase(fetchAtendee.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  removeJobApplication,
} = eventAttendeeSlice.actions;
export default eventAttendeeSlice.reducer;
