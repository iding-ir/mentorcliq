import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { getSignIn, getSignOut, getSignUp } from "./api";

export interface State {
  user: any;
  isLoggedIn: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: State = {
  user: "",
  isLoggedIn: false,
  status: "idle",
};

export const signIn = createAsyncThunk("auth/signIn", async (data: any) => {
  return await getSignIn(data);
});

export const signOut = createAsyncThunk("auth/signOut", async () => {
  return await getSignOut();
});

export const signUp = createAsyncThunk("auth/signUp", async (data: any) => {
  return await getSignUp(data);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(signOut.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = {};
        state.isLoggedIn = false;
      })
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLoggedIn = true;
      });
  },
});

// export const {} = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;