import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { RootState } from "../store";

interface IInitialState {
  products: [];
  isLoading: boolean;
}

const initialState: IInitialState = {
  products: [],
  isLoading: true,
};

export const getAllProduct = createAsyncThunk(
  "userDashboard/getAllProduct",
  async () => {
    try {
      const res = await axios.get("/product/all");
      return res.data.data;
    } catch (e: any) {
      console.log(e);
    }
  }
);

const userDashboardSlice = createSlice({
  name: "userDashboard",
  initialState,
  reducers: {
    /**
     * This method updates the products state in
     * client side.
     */
    rehydrate: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })

      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectUserDashboard = (state: RootState) => state.userDashboard;

export const { rehydrate } = userDashboardSlice.actions;

export default userDashboardSlice.reducer;
