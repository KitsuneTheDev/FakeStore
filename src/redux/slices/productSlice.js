import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllProducts } from "../../api/getAllProducts.api.js";

const initialState = {
    products: null,
    loading: null,
    error: null,
};

export const fetchProductsToStore = createAsyncThunk(
    'products/getProducts', 
    async (rejectWithValue) => {
        try {
            const response = await getAllProducts();
            if(response.error) {
                return rejectWithValue(response?.error || 'No response from getAllProducts.');
            } else {
                return response;
            }
        } catch(error) {
            const errorMessage = error?.response?.data?.message || error?.message || 'Get All Products Error';
            return rejectWithValue(errorMessage);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
    // REDUCERS HERE
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProductsToStore.pending, (state) => {
            state.products = null;
            state.loading = true;
            state.error = null;
        }).addCase(fetchProductsToStore.rejected, (state, action) => {
            state.loading = false;
            state.products = null;
            state.error = action.payload;
        }).addCase(fetchProductsToStore.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.products = action.payload;
        })
    }
});

export default productSlice.reducer;