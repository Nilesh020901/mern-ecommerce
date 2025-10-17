import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductsSlice from './admin/products-slice';
import shoppingProductSlice from './shop/product-slice.js';
import shoppingCartSlice from './shop/cart-slice/index.js';

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: shoppingProductSlice,
        shoppingCart: shoppingCartSlice,
    },
})

export default store;