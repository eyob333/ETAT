import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import baseURL from '../app/api/baseApi';

export const fetchUser = createAsyncThunk('users/fetchUsers', async (thunkAPI) => {
  const url = `${baseURL}/profiles`;
  try {
    const response = await axios.get(url);
    return response.data.profiles;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  users: [],
  admin: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    removeUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
    // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },

});

export const { setAdmin, removeUser } = userSlice.actions;
export default userSlice.reducer;
