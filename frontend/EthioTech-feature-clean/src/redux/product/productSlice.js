import { createSlice } from '@reduxjs/toolkit';
import { productApiSlice } from './productApiSlice';

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(product => product.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setError,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;

// Selectors
export const selectAllProducts = (state) => state.product.products;
export const selectProductById = (state, productId) => 
  state.product.products.find(product => product.id === productId);
export const selectProductsByCategory = (state, category) =>
  state.product.products.filter(product => product.category === category);
export const selectProductError = (state) => state.product.error;
export const selectProductLoading = (state) => state.product.isLoading;

