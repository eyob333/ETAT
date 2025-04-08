import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchTraining = createAsyncThunk('trainings/fetchTrainings', async (thunkAPI) => {
  const url = `${baseURL}/trainings`;
  try {
    const response = await axios.get(url);
    return response.data.trainings;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  trainings: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const trainingSlice = createSlice({

  name: 'training',
  initialState,
  reducers: {
    addTraining: (state, action) => {
      state.trainings.push(action.payload);
    },
    updateTrainingState: (state, action) => {
      const updatedTraining = action.payload;
      const index = state.trainings.findIndex((training) => training.id === updatedTraining.id);
      if (index !== -1) {
        state.trainings[index] = updatedTraining;
      } else {
        toast.error('something went wrong');
      }
    },
    removeTraining: (state, action) => {
      state.trainings = state.trainings.filter((training) => training.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchTraining.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trainings = action.payload.sort((a, b) => {
          const dateA = new Date(a.start_date); // Convert the start dates to Date objects
          const dateB = new Date(b.start_date);
          return dateA - dateB; // Compare the dates
        });
      })
      .addCase(fetchTraining.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeTraining, updateTrainingState, addTraining,
} = trainingSlice.actions;
export default trainingSlice.reducer;
