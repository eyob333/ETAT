import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi'; // Assuming this defines your base API URL

// Async thunk to fetch all testimonials from the API
export const fetchTestimonials = createAsyncThunk('testimonials/fetchTestimonials', async (thunkAPI) => {
  const url = `${baseURL}/testimonials`;
  try {
    const response = await axios.get(url);
    // Assuming your API response structure is { success: true, data: [...] }
    return response.data.data;
  } catch (error) {
    // Return a rejected value with the error response data
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Initial state for the testimonial slice
const initialState = {
  testimonials: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

// Create the testimonial slice
const testimonialSlice = createSlice({
  name: 'testimonials', // Slice name
  initialState,
  reducers: {
    // Reducer to add a single testimonial to the state
    addTestimonial: (state, action) => {
      state.testimonials.push(action.payload);
    },
    // Reducer to update an existing testimonial in the state
    updateTestimonialState: (state, action) => {
      const updatedTestimonial = action.payload;
      // Find the index of the testimonial to update
      const index = state.testimonials.findIndex((testimonial) => testimonial.id === updatedTestimonial.id);
      if (index !== -1) {
        state.testimonials[index] = updatedTestimonial; // Update the testimonial
      } else {
        toast.error('Testimonial not found in state'); // Show error if not found
      }
    },
    // Reducer to remove a testimonial from the state
    removeTestimonial: (state, action) => {
      state.testimonials = state.testimonials.filter((testimonial) => testimonial.id !== action.payload);
    },
  },
  // Extra reducers to handle the lifecycle of the async thunk
  extraReducers: (builder) => {
    builder
      // Handle pending state when fetching testimonials
      .addCase(fetchTestimonials.pending, (state) => {
        state.isLoading = true;
        state.error = false; // Reset error on new request
        state.errMsg = '';
      })
      // Handle fulfilled state when testimonials are successfully fetched
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.testimonials = action.payload.sort((a, b) => {
          // Sort testimonials by creation date, newest first
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
      })
      // Handle rejected state when fetching testimonials fails
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload; // Set the error message from the payload
        state.testimonials = []; // Clear testimonials on error
      });
  },
});

// Export individual action creators
export const {
  addTestimonial,
  updateTestimonialState,
  removeTestimonial,
} = testimonialSlice.actions;

// Export the reducer for the store
export default testimonialSlice.reducer;
