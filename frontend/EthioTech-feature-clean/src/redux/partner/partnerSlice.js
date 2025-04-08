import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchPartner = createAsyncThunk('partners/fetchPartners', async (thunkAPI) => {
  const url = `${baseURL}/partners`;
  try {
    const response = await axios.get(url);
    return response.data.partners;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  partners: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const partnerSlice = createSlice({

  name: 'partner',
  initialState,
  reducers: {
    addPartner: (state, action) => {
      state.partners.push(action.payload);
    },
    updatePartnerState: (state, action) => {
      const updatedPartner = action.payload;
      const index = state.partners.findIndex((partner) => partner.id === updatedPartner.id);
      if (index !== -1) {
        state.partners[index] = updatedPartner;
      } else {
        toast.error('something went wrong');
      }
    },
    removePartner: (state, action) => {
      state.partners = state.partners.filter((partner) => partner.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchPartner.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPartner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartner.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removePartner, updatePartnerState, addPartner,
} = partnerSlice.actions;
export default partnerSlice.reducer;
