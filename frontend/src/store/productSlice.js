// store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/api/products'); // Adjust to your API route
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('/product', product, { headers: { 'Content-Type': 'multipart/form-data' } });
  return response.data.product; // Assuming your API responds with the added product
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, product }) => {
  const response = await axios.put(`/api/product/${id}`, product);
  return response.data.product; // Assuming your API responds with the updated product
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`/api/product/${id}`);
  return id; // Return the id of the deleted product
});

export const hideProduct = createAsyncThunk('products/hideProduct', async (id) => {
  const response = await axios.patch(`/api/product/${id}/hide`);
  return response.data.product; // Return the updated product
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload);
      })
      .addCase(hideProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload; // Assuming it returns the updated product
        }
      });
  },
});

export const selectProducts = (state) => state.products.items;

export default productSlice.reducer;
