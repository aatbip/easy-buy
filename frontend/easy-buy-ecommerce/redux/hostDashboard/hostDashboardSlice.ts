import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { RootState } from "../store";

interface IInitialState {
  hostProduct: [];
  isLoading: boolean;
}

const initialState: IInitialState = {
  hostProduct: [],
  isLoading: true,
};

const credentials = Cookies.get("userCredentials");
let authorization: any;
if (credentials) {
  const data = JSON.parse(credentials);
  authorization = `Bearer ${data.accessToken} `;
}

export const getAdminProduct = createAsyncThunk(
  "hostDashboard/getAdminProduct",
  async () => {
    try {
      const res = await axios.get("/product/");
      return res;
    } catch (e: any) {
      console.log(e);
    }
  }
);

const hostDashboardSlice = createSlice({
  name: "hostDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAdminProduct.fulfilled, (state, action) => {
        state.hostProduct = action.payload?.data.data;
        state.isLoading = false;
      })

      .addCase(getAdminProduct.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectHostDashboard = (state: RootState) => state.hostDashboard;

export default hostDashboardSlice.reducer;
