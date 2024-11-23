import { configureStore } from '@reduxjs/toolkit';
import productReducer from "./slices/productSlice";

// import todoReducer from "./slices/todosSlice";

export const store = configureStore({
    reducer: {
        products: productReducer
    },
});