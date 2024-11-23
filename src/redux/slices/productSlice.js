import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/products";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// export const addTodo = createAsyncThunk("todos/addTodo", async (todo) => {
//   const response = await axios.post(API_URL, todo);
//   return response.data;
// }); 

// export const currentTodo = createAsyncThunk("todos/currentTodo", async (id) => {
//     const response = await axios.get(`${API_URL}/${id}`);
//     return response.data;
// });
// export const updateTodo = createAsyncThunk("todos/updateTodo", async (data) => {
//     const response = await axios.put(`${API_URL}/${data.id}`, data);
//     return response.data;
// });
// export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
//     const response = await axios.delete(`${API_URL}/${id}`);
//     return response.data;
// });
// export const toggleTodo = createAsyncThunk("todos/toggleTodo", async (data) => {
//     const newData = {...data, completed: !data.completed};
//     const response = await axios.patch(`${API_URL}/${data.id}`, newData);
//     return response.data;
// })

const initialState = {
    products: [],
    product: {},
    isUpdate: false,
    loading: false,
    error: null,
    isSuccess: false,
    isScan: false
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        toggleScanner: (state) => {
            state.isScan = !state.isScan;
        }
    },
    extraReducers: (builder) => {
        //Fetch Products
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.isScan = false;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading =false;
            state.error = action.payload || "something wrong";
        })

        // //Add Todo
        // builder.addCase(addTodo.pending, (state) => {
        //     state.loading = true;
        //     state.isSuccess = false;
        // });
        // builder.addCase(addTodo.fulfilled, (state) => {
        //     state.loading = false;
        //     state.isSuccess = true;
        // });
        // builder.addCase(addTodo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "something wrong";
        // });

        // //currentTodo
        // builder.addCase(currentTodo.pending, (state) => {
        //     state.loading = true;
        //     state.isSuccess = false;
        // });
        // builder.addCase(currentTodo.fulfilled, (state, action) => {
        //     state.loading = false;
        //     state.isSuccess = false;
        //     state.isUpdate = true;
        //     state.todo = action.payload;
        // });
        // builder.addCase(currentTodo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "something wrong";
        // });

        // //updateTodo
        // builder.addCase(updateTodo.pending, (state) => {
        //     state.loading = true;
        //     state.isSuccess = false;
        // });
        // builder.addCase(updateTodo.fulfilled, (state) =>{
        //     state.loading = false;
        //     state.isSuccess = true;
        //     state.isUpdate = false;
        //     state.todo = {};
        // });
        // builder.addCase(updateTodo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "something wrong";
        // });

        // //deleteTodo
        // builder.addCase(deleteTodo.pending, (state) => {
        //     state.loading = true;
        //     state.isSuccess = false;
        // });
        // builder.addCase(deleteTodo.fulfilled, (state) =>{
        //     state.loading = false;
        //     state.isSuccess = true;
        // });
        // builder.addCase(deleteTodo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "something wrong";
        // });

        // //toggleTodo
        // builder.addCase(toggleTodo.pending, (state) => {
        //     state.loading = true;
        //     state.isSuccess = false;
        // });
        // builder.addCase(toggleTodo.fulfilled, (state) =>{
        //     state.loading = false;
        //     state.isSuccess = true;
        // });
        // builder.addCase(toggleTodo.rejected, (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload || "something wrong";
        // });
        
    }
});
export const { toggleScanner } = productSlice.actions;
export default productSlice.reducer;
