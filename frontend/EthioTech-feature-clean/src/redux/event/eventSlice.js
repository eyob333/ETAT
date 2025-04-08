import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchEvent = createAsyncThunk('events/fetchEvents', async (thunkAPI) => {
  const url = `${baseURL}/events`;
  try {
    const response = await axios.get(url);
    return response.data.events;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  events: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const eventSlice = createSlice({

  name: 'event',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    updateEventState: (state, action) => {
      const updatedEvent = action.payload;
      const index = state.events.findIndex((event) => event.id === updatedEvent.id);
      if (index !== -1) {
        state.events[index] = updatedEvent;
      } else {
        toast.error('something went wrong');
      }
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload.sort((a, b) => {
          const dateA = new Date(a.start_date); // Convert the start dates to Date objects
          const dateB = new Date(b.start_date);
          return dateB - dateA; // Compare the dates
        });
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeEvent, updateEventState, addEvent,
} = eventSlice.actions;
export default eventSlice.reducer;
