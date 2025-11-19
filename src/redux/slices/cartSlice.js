import { createSlice } from "@reduxjs/toolkit";

const getUserCartFromLocal = () => {
    const local = localStorage.getItem('userCart') || undefined;
    console.log(local);
    if(!local) {
        return [];
    } else {
        return JSON.parse(local);
    }
}

const setUsertCartFromLocal = (userCart) => {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}

const initialState = {
    cartProducts: getUserCartFromLocal(),
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const selectedProduct = state.cartProducts.find(product => product.id === action.payload.id);
            console.log("payload -->", action.payload);
            if(!selectedProduct) {
                console.log("HERE");
                state.cartProducts.push({...action.payload, count: 1});
                setUsertCartFromLocal(state.cartProducts);
            } else{
                selectedProduct.count += 1;
                setUsertCartFromLocal(state.cartProducts);
            }
            console.log(state.cartProducts);
        },
        deleteFromCart: (state, action) => {
            const selectedProduct = state.cartProducts.find(product => product.id === action.payload.id);
            if(!selectedProduct) {
                return;
            } else{
                if(selectedProduct.count !== 1) {
                    selectedProduct.count -= 1;
                    setUsertCartFromLocal(state.cartProducts);
                } else {
                    state.cartProducts = state.cartProducts.filter(product => product.id !== selectedProduct.id);
                    setUsertCartFromLocal(state.cartProducts);
                }
            }  
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer; 