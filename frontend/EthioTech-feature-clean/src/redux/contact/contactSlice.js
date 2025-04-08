import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../app/api/baseApi';

export const fetchContact = createAsyncThunk('contacts/fetchContacts', async (thunkAPI) => {
  const url = `${baseURL}/contacts`;
  try {
    const response = await axios.get(url);
    return response.data.contact;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  contacts: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const contactSlice = createSlice({

  name: 'contact',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    updateContactState: (state, action) => {
      state.contacts = action.payload;
    },
    removeContact: (state, action) => {
      state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const {
  addUser, removeContact, updateContactState, addContact,
} = contactSlice.actions;
export default contactSlice.reducer;
