import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    approvalURL: null,
    isLoading: false,
    orderId: null,
    orderList: [],
    orderDetails: null
};

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/shop/order/create',
        orderData
      );
      return response.data;
    } catch (error) {
      // handle and return error in Redux Toolkit style
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const capturePayment = createAsyncThunk(
  '/order/capturePayment',
  async ({paymentId, payerId, orderId}, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/shop/order/capture',
        {
          paymentId, payerId, orderId
        }
      );
      return response.data;
    } catch (error) {
      // handle and return error in Redux Toolkit style
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk(
  '/order/getAllOrdersByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/list/${userId}`
      );
      return response.data;
    } catch (error) {
      // handle and return error in Redux Toolkit style
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrderDetais = createAsyncThunk(
  '/order/getOrderDetais',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/shop/order/details/${id}`
      );
      return response.data;
    } catch (error) {
      // handle and return error in Redux Toolkit style
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const shoppingOrderSlice = createSlice({
    name: 'shoppingOrderSlice',
    initialState,
    reducers: {
      resetOrderDetails:(state) => {
        state.orderDetails = null
      }
    },
    extraReducers: (builder) => {
        builder.addCase(createNewOrder.pending, (state)=> {
            state.isLoading = true;
        }).addCase(createNewOrder.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.approvalURL = action.payload.approvalURL;
            state.orderId = action.payload.orderId;
            sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId))
        }).addCase(createNewOrder.rejected, (state, action)=> {
            state.isLoading = false;
            state.approvalURL = null;
            state.orderId = null
        }).addCase(getAllOrdersByUserId.pending, (state)=> {
            state.isLoading = true;
        }).addCase(getAllOrdersByUserId.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersByUserId.rejected, (state, action)=> {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrderDetais.pending, (state)=> {
            state.isLoading = true;
        }).addCase(getOrderDetais.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetais.rejected, (state, action)=> {
            state.isLoading = false;
            state.orderDetails = null ;
        })
    },
});

export const {resetOrderDetails} = shoppingOrderSlice.actions;

export default shoppingOrderSlice.reducer;