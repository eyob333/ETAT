import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchJob = createAsyncThunk('jobs/fetchjob', async (thunkAPI) => {
  const url = `${baseURL}/jobs`;
  try {
    const response = await axios.get(url);
    return response.data.jobs;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  jobs: [],
  isLoadingJob: false,
  errMsg: '',
  error: false,
};

const jobSlice = createSlice({

  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJobState: (state, action) => {
      const updatedJob = action.payload;
      const index = state.jobs.findIndex((job) => job.id === updatedJob.id);
      if (index !== -1) {
        state.jobs[index] = updatedJob;
      } else {
        toast.error('something went wrong');
      }
    },
    removeJob: (state, action) => {
      state.jobs = state.jobs.filter((service) => service.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchJob.pending, (state) => {
        state.isLoadingJob = true;
      })
      .addCase(fetchJob.fulfilled, (state, action) => {
        state.isLoadingJob = false;
        state.jobs = action.payload.sort((a, b) => {
          const dateA = new Date(a.start_date); // Convert the start dates to Date objects
          const dateB = new Date(b.start_date);
          return dateA - dateB; // Compare the dates
        });
      })
      .addCase(fetchJob.rejected, (state, action) => {
        state.isLoadingJob = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addJob, removeJob, updateJobState, addService,
} = jobSlice.actions;
export default jobSlice.reducer;
