import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice.js';

const store = configureStore({
    reducer: {
        productReducer,
    }
});

export default store;