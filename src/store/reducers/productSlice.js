import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getErrorMessage, fetchProductsApi } from '../api/Api';
import products from '../Products.json';

export const getProducts = createAsyncThunk(
  'products/all',
  async ({ }, thunkAPI) => {
    try {
      // const products = await fetchProductsApi();
      // TODO Replace with real fetch API call
      return products;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const addToCart = createAsyncThunk(
  'products/addToCart',
  async ({ item }, thunkAPI) => {
    try {
      // TODO Replace with real fetch API call
      return item;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeToCart = createAsyncThunk(
  'products/removeToCart',
  async ({ id }, thunkAPI) => {
    try {
      // TODO Replace with real fetch API call
      return id;
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: [],
  cart: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.isFetching = true;
    },
    [getProducts.fulfilled]: (state, action) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.data = action.payload;
    },
    [getProducts.rejected]: (state, action) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = action.payload;
    },

    [addToCart.fulfilled]: (state, action) => {
      const item = action.meta.arg.item;
      state.cart.push(item);
    },
    [removeToCart.fulfilled]: (state, action) => {
      const id = action.meta.arg.id;
      const index = state.cart.findIndex(i => i.id === id);
      if (index >= 0) {
        state.cart.splice(index, 1);
      }
    },
  },
});

export const { clearState, setCategory } = productSlice.actions;

const reducer = productSlice.reducer;
export default reducer;
