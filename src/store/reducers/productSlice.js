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

const initialState = {
  isFetching: false,
  isSuccess: false,
  isError: false,
  errorMessage: '',
  data: [],
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
  },
});

export const { clearState, setCategory } = productSlice.actions;

const reducer = productSlice.reducer;
export default reducer;
