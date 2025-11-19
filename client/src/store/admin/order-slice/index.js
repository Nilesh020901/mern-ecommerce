import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    orderList: [],
    orderDetails: null
};

export const getAllOrdersForAdmin = createAsyncThunk(
    '/order/getAllOrdersForAdmin',
    async ({ rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/admin/orders/get`
            );
            return response.data;
        } catch (error) {
            // handle and return error in Redux Toolkit style
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getOrderDetaisForAdmin = createAsyncThunk(
    '/order/getOrderDetaisForAdmin',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/admin/orders/details/${id}`
            );
            return response.data;
        } catch (error) {
            // handle and return error in Redux Toolkit style
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateOrderStatus = createAsyncThunk(
    '/order/updateOrderStatus',
    async ({id, orderStatus}, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/admin/orders/update/${id}`,
                {
                    orderStatus
                }
            );
            return response.data;
        } catch (error) {
            // handle and return error in Redux Toolkit style
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers: {
        resetOrderDetails:(state) => {
            state.orderDetails = null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersForAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderList = action.payload.data;
        }).addCase(getAllOrdersForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderList = [];
        }).addCase(getOrderDetaisForAdmin.pending, (state) => {
            state.isLoading = true;
        }).addCase(getOrderDetaisForAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.orderDetails = action.payload.data;
        }).addCase(getOrderDetaisForAdmin.rejected, (state) => {
            state.isLoading = false;
            state.orderDetails = null;
        })
    },
});

export const { resetOrderDetails } = adminOrderSlice.actions;
export default adminOrderSlice.reducer;