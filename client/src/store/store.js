import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductsSlice from './admin/products-slice';
import shoppingProductSlice from './shop/product-slice.js';
import shoppingCartSlice from './shop/cart-slice';
import shoppingAddressSlice from './shop/address-slice';

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductsSlice,
        shopProducts: shoppingProductSlice,
        shopCart: shoppingCartSlice,
        shopAddress: shoppingAddressSlice
    },
})

export default store;