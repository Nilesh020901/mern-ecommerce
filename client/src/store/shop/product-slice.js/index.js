import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
}

export const fetchAllFilteredProducts = createAsyncThunk(
  'products/fetchAllFilteredProducts',
  async ({ filterParams, sortParams }, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams
      });
      const result = await axios.get(`http://localhost:5000/api/shop/products/get-all-products?${queryParams}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.get(`http://localhost:5000/api/shop/products/get-product/${id}`);
      return result?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {
      setProductDetails: (state) => {
        state.productDetails = null;
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllFilteredProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data
        }).addCase(fetchAllFilteredProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.productList = [];
        })
        .addCase(fetchProductDetails.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchProductDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productDetails = action.payload.data
        }).addCase(fetchProductDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.productDetails = null;
        })
    }
})

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;