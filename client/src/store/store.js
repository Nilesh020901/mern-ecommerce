import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice/index'
import AdminProductsSlice from './admin/products-slice';
import AdminOrdeSlice from './admin/order-slice';
import shoppingProductSlice from './shop/product-slice.js';
import shoppingCartSlice from './shop/cart-slice';
import shoppingAddressSlice from './shop/address-slice';
import shoppingOrdeSlice from './shop/order-slice';

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminProducts: AdminProductsSlice,
        adminOrder: AdminOrdeSlice,
        shopProducts: shoppingProductSlice,
        shopCart: shoppingCartSlice,
        shopAddress: shoppingAddressSlice,
        shopOrder: shoppingOrdeSlice,
    },
})

export default store;