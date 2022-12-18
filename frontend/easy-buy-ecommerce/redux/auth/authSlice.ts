import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import "../../axios/axios";
import { IFormData } from "../../types/types";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface IInitialState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    shopName?: string;
  };
  isLoggedIn: boolean;
  isLoading: boolean;
  response: string;
}

interface IUserRegistrationPayload extends IFormData {
  role: "user" | "host";
}

interface IUserLoginPayload {
  email: string;
  password: string;
}

const initialState: IInitialState = {
  user: { id: "", name: "", email: "", role: "", shopName: "" },
  isLoggedIn: false,
  isLoading: true,
  response: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (data: IUserRegistrationPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/register", data);
      toast.success("Registration Successful!");
      return res.data.status;
    } catch (error: any) {
      toast.error(error.response.data.data);
      rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (data: IUserLoginPayload, { rejectWithValue }) => {
    try {
      const res = await axios.post("/auth/signin", data);
      toast.success("You are Logged In!");
      return res.data;
    } catch (error: any) {
      toast.error(error.response.data.data);
      rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    await axios.post("/auth/signout");
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state) => {
      if (Cookies.get("userCredentials")) {
        const credentials = Cookies.get("userCredentials");
        if (credentials) {
          const data = JSON.parse(credentials);
          state.user = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            shopName: data?.shopName,
          };
          state.isLoggedIn = true;
          state.response = "success";
        }
      }
    },
    unSetUser: (state) => {
      state.isLoggedIn = false;
      state.response = "";
      state.user = { id: "", name: "", email: "", role: "", shopName: "" };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.response = action.payload;
        state.isLoading = false;
      })

      .addCase(register.rejected, (state, action) => {
        state.isLoading = true;
      })

      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = {
          id: action.payload?.data.id,
          name: action.payload?.data.name,
          email: action.payload?.data.email,
          role: action.payload?.data.role,
          shopName: action.payload?.data.shopName,
        };
        state.response = action.payload?.status;
        state.isLoading = false;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = true;
      });
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { setUser, unSetUser } = authSlice.actions;

export default authSlice.reducer;
