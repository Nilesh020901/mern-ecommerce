import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    addressList: [],
    isLoading: false
}
export const addNewAddress = createAsyncThunk(
    '/addresses/addNewAddress',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:5000/api/shop/address/add-address', formData, {
                withCredentials: true
            });
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
)

export const fetchAllAddress = createAsyncThunk(
    '/addresses/fetchAllAddress',
    async ({ userId }) => {
        const response = await axios.post(`http://localhost:5000/api/shop/address/get-address/${userId}`)
        return response.data
    }
)

export const editaAddress = createAsyncThunk(
    '/addresses/editaAddress',
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(`http://localhost:5000/api/shop/address/${userId}/${addressId}`, formData)
        return response.data
    }
)

export const deleteAddress = createAsyncThunk(
    '/addresses/deleteAddress',
    async ({ userId, addressId }) => {
        const response = await axios.delete(`http://localhost:5000/api/shop/address/delete-address/${userId}/${addressId}`);
        return response.data
    }
)

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider
            .addCase(addNewAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(addNewAddress.fulfilled, (state, action) => {
                state.isLoading = false;
            }).addCase(addNewAddress.rejected, (state) => {
                state.isLoading = false;
            }).addCase(fetchAllAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(fetchAllAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            }).addCase(fetchAllAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            }).addCase(editaAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(editaAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            }).addCase(editaAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            }).addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            }).addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addressList = action.payload.data;
            }).addCase(deleteAddress.rejected, (state) => {
                state.isLoading = false;
                state.addressList = [];
            })
    }
});

export default addressSlice.reducer;