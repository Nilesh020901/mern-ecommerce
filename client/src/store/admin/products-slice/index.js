import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    productList: [],
}

export const addNewProduct = createAsyncThunk(
  'products/addnewproduct',
  async (formData, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        'http://localhost:5000/api/admin/products/add-product',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const result = await axios.get('http://localhost:5000/api/admin/products/get-all-products');
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const editProduct = createAsyncThunk(
  'products/editProduct',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const result = await axios.put(
        `http://localhost:5000/api/admin/products/edit-product/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const result = await axios.delete(
        `http://localhost:5000/api/admin/products/delete-product/${id}`
      );
      return result.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllProducts.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchAllProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productList = action.payload.data
        }).addCase(fetchAllProducts.rejected, (state, action) => {
            console.log(action.payload);
            state.isLoading = false;
            state.productList = [];
        })
    },
});

export default AdminProductsSlice.reducer;