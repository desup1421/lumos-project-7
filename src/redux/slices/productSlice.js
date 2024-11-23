import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000";

//FETCH DATA
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
});

//FETCH LOGS
export const fetchLogs = createAsyncThunk("products/fetchLogs", async () => {
    const response = await axios.get(`${API_URL}/logs`);
    return response.data;
});

//GET DATA SCAN
export const getData = createAsyncThunk("products/getData", async (id, { rejectWithValue }) => {
    try{
        const response = await axios.get(`${API_URL}/products/${id}`);
        return response.data;
    } catch(error) {
        if(error.status === 404) {
            console.log(id)
            return rejectWithValue(id);
        }
    }
});

// ADD PRODUCT
export const addProduct = createAsyncThunk("products/addProduct", async (data) => {
    const response = await axios.post(`${API_URL}/products/`, data);
    return response.data;   
})

// EDIT PRODUCT
export const updateProduct = createAsyncThunk("products/updateData", async (data) => {
    const response = await axios.put(`${API_URL}/products/${data.id}`, data);
    return response.data;
})
// DELETE DATA
export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    return response.data;
})

//STOCK OUT
export const stockOut = createAsyncThunk("products/stockOut", async (data) => {
    //UPDATE DATA
    const oldData = await axios.get(`${API_URL}/products/${data.product_id}`);
    const stock = parseInt(oldData.data.stock) - parseInt(data.quantity);
    const newData = {
        ...oldData.data,
        stock: stock
    };
    await axios.put(`${API_URL}/products/${data.product_id}`, newData);

    //CREATE LOG
    const response = await axios.post(`${API_URL}/logs/`, data);
    return response.data;
});

//STOCK IN
export const stockIn = createAsyncThunk("products/stockIn", async (data) => {
    //UPDATE DATA
    const oldData = await axios.get(`${API_URL}/products/${data.product_id}`);
    const stock = parseInt(oldData.data.stock) + parseInt(data.quantity);
    const newData = {
        ...oldData.data,
        stock: stock
    };
    await axios.put(`${API_URL}/products/${data.product_id}`, newData);

    //CREATE LOG
    const response = await axios.post(`${API_URL}/logs/`, data);
    return response.data;
});

//High Demand Product
export const highDemand = createAsyncThunk("products/highDemand", async () => {
    const responseLog = await axios.get(`${API_URL}/logs/`);
    const logs = responseLog.data;

    const filterLogs = logs.filter((log) => log.type === "stock_out");
    const demand = filterLogs.reduce((acc, logs) => {
        const { product_id, quantity } = logs;
        acc[product_id] = (acc[product_id] || 0) + Number(quantity);
        return acc;
    }, {});
    const sortedDemand = Object.entries(demand).sort((a, b) => b[1] - a[1]);
    const highestDemand = sortedDemand.slice(0, 3);
    return highestDemand;
});

export const filterStockIn = createAsyncThunk("products/filterStockIn", async () => {
    const responseLog = await axios.get(`${API_URL}/logs/`);
    const logs = responseLog.data;
    const filterLogs = logs.filter((log) => log.type === 'stock_in');
    return filterLogs;
});
export const filterStockOut = createAsyncThunk("products/filterStockOut", async () => {
    const responseLog = await axios.get(`${API_URL}/logs/`);
    const logs = responseLog.data;
    const filterLogs = logs.filter((log) => log.type === 'stock_out');
    return filterLogs;
});


const initialState = {
    products: [],
    logs: [],
    data: {},
    loading: false,
    error: null,
    isSuccess: false,
    isScan: false,
    isAddData: true,
    highestDemand: [],
    totalProduct: null,
    soldProduct: null,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        toggleScanner: (state) => {
            state.isScan = !state.isScan;
        },
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
            state.totalProduct = action.payload.length;
            state.isSuccess = false;
            state.data = {};
            state.isAddData = true;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "something wrong";
        });

        //Fetch Logs
        builder.addCase(fetchLogs.pending, (state) => {
            state.loading = true;
            state.isScan = false;
        });
        builder.addCase(fetchLogs.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.isSuccess = false;
            state.data = {};
            state.isAddData = true;
        });
        builder.addCase(fetchLogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "something wrong";
        });
        //Filter Stock In
        builder.addCase(filterStockIn.pending, (state) => {
            state.loading = true;
            state.isScan = false;
        });
        builder.addCase(filterStockIn.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.isSuccess = false;
            state.data = {};
        });
        builder.addCase(filterStockIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "something wrong";
        });
        //Filter Stock Out
        builder.addCase(filterStockOut.pending, (state) => {
            state.loading = true;
            state.isScan = false;
        });
        builder.addCase(filterStockOut.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = action.payload;
            state.isSuccess = false;
            state.data = {};
        });
        builder.addCase(filterStockOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "something wrong";
        });

        //Get Data
        builder.addCase(getData.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        });
        builder.addCase(getData.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
            state.isAddData = false;
            state.isScan = false;
        });
        builder.addCase(getData.rejected, (state, action) => {
            state.loading = false;
            state.data = {id: action.payload}
            state.isAddData = true;
            state.isScan = false;
        });

        // Add Data
        builder.addCase(addProduct.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })
        builder.addCase(addProduct.fulfilled, (state) => {
            state.loading = false;
            state.isSuccess = true;
        })
        builder.addCase(addProduct.rejected, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })

        // Update Data
        builder.addCase(updateProduct.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })
        builder.addCase(updateProduct.fulfilled, (state) => {
            state.loading = false;
            state.isSuccess = true;
        })
        builder.addCase(updateProduct.rejected, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })

        // Delete Product
        builder.addCase(deleteProduct.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })
        builder.addCase(deleteProduct.fulfilled, (state) => {
            state.loading = false;
            state.isSuccess = true;
        })
        builder.addCase(deleteProduct.rejected, (state) => {
            state.loading = true;
            state.isSuccess = false;
        })

        //add logs (STOCKOUT)
        builder.addCase(stockOut.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        });
        builder.addCase(stockOut.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = [...state.logs, action.payload];
            state.data = {};
            state.isSuccess = true;
        });
        builder.addCase(stockOut.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.payload || "something wrong";
        });

        //add logs (STOCKIN)
        builder.addCase(stockIn.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        });
        builder.addCase(stockIn.fulfilled, (state, action) => {
            state.loading = false;
            state.logs = [...state.logs, action.payload];
            state.data = {};
            state.isSuccess = true;
        });
        builder.addCase(stockIn.rejected, (state, action) => {
            state.loading = false;
            state.data = {};
            state.error = action.payload || "something wrong";
        });

        //high demand product
        builder.addCase(highDemand.pending, (state) => {
            state.loading = true;
            state.isSuccess = false;
        });
        builder.addCase(highDemand.fulfilled, (state, action) => {
            state.loading = false;
            state.highestDemand = action.payload;
            state.soldProduct = action.payload.reduce((acc,item) =>  {return acc + item[1]}, 0);
            state.isSuccess = true;
        });
        builder.addCase(highDemand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "something wrong";
        }); 
    }
});
export const { toggleScanner } = productSlice.actions;
export default productSlice.reducer;
