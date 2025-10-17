import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState ={
    cartItems: [],
    isLoading: false,
}

export const addToCart = createAsyncThunk(
    'shoppingCart/addToCart',
    async({ userId, productId, quantity }) => {
        const response = await axios.post(`http://localhost:5000/api/shop/cart/add-to-cart`, {
            userId,
            productId,
            quantity
        },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    });
        return response?.data;
    }
)

export const fetchCartItems = createAsyncThunk(
    'shoppingCart/fetchCartItems',
    async({ userId }) => {
        const response = await axios.get(`http://localhost:5000/api/shop/cart/get-cart-items/${userId}`);
        return response?.data;
    }
)


export const updateCartItems = createAsyncThunk(
    'shoppingCart/updateCartItems',
    async({ userId, productId, quantity }) => {
        const response = await axios.put(`http://localhost:5000/api/shop/cart/update-cart-items`, {
            userId,
            productId,
            quantity
        });
        return response?.data;
    }
)

export const deleteFromCart = createAsyncThunk(
    'shoppingCart/deleteFromCart',
    async({ userId, productId }) => {
        const response = await axios.delete(`http://localhost:5000/api/shop/cart/delete-from-cart/${userId}/${productId}`);
        return response?.data;
    }
)


const shoppingCartSlice = createSlice({
    name: "shoppingCart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(addToCart.fulfilled, (state, action) => {
            state.isLoading =false;
            state.cartItems = action.payload.data;
        }).addCase(addToCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(fetchCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(fetchCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(updateCartItems.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateCartItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(updateCartItems.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        }).addCase(deleteFromCart.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.cartItems = action.payload.data;
        }).addCase(deleteFromCart.rejected, (state) => {
            state.isLoading = false;
            state.cartItems = [];
        });
    },
});

export default shoppingCartSlice.reducer;