import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice.js';
import cartReducer from './slices/cartSlice.js';

const store = configureStore({
    reducer: {
        productReducer,
        cartReducer,
    }
});

export default store;