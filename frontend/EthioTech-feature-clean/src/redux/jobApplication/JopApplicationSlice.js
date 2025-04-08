/* eslint-disable import/no-cycle */
/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchJobApp = createAsyncThunk('jobApplication/fetchjobApp', async (thunkAPI) => {
  const url = `${baseURL}/jobApplications`;
  try {
    const response = await axios.get(url);
    return response.data.jobApplications;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  jobApplications: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const jobApplicationSlice = createSlice({

  name: 'jobApplication',
  initialState,
  reducers: {
    addJobApplication: (state, action) => {
      state.jobApplications.push(action.payload);
    },
    updateJobApplicationState: (state, action) => {
      const updatedJob = action.payload;
      const index = state.jobApplications.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobApplications[index] = updatedJob;
      } else {
        toast.error('something went wrong');
      }
    },
    removeJobApplication: (state, action) => {
      state.jobApplications = state.jobApplications.filter((service) => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchJobApp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchJobApp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jobApplications = action.payload.sort((a, b) => {
          const dateA = new Date(a.createdAt); // Convert the start dates to Date objects
          const dateB = new Date(b.createdAt);
          return dateB - dateA; // Compare the dates
        });
      })
      .addCase(fetchJobApp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addJobApplication, removeJobApplication, updateJobApplicationState, addService,
} = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
