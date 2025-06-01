import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '../app/api/baseApi';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (thunkAPI) => {
  const url = `${baseURL}/products`;
  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  products: [],
  isLoading: false,
  errMsg: '',
  error: false,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductState: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex((product) => product.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      } else {
        toast.error('Something went wrong');
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errMsg = action.payload;
      });
  },
});

export const {
  addProduct, removeProduct, updateProductState
} = productSlice.actions;
export default productSlice.reducer;

