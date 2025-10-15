import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductsSlice from './admin/products-slice';
import shoppingProductSlice from './shop/product-slice.js';

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: shoppingProductSlice,
    },
})

export default store;