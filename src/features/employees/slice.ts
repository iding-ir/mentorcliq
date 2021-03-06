import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IEmployee } from "../../types";
import { getEmployees } from "./api";

export interface IEmployees {
  [keys: string]: IEmployee;
}
export interface State {
  all: IEmployees;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: State = {
  all: {},
  status: "idle",
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const data = await getEmployees();

    return data.reduce((total: IEmployees, current: IEmployee) => {
      return { ...total, [current.email]: current };
    }, {});
  }
);

export const slice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.all = action.payload;
      });
  },
});

// export const {} = slice.actions;

export const selectEmployees = (state: RootState) => state.employees.all;

export default slice.reducer;
