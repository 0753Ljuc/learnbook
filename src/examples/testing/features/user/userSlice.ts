import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const fetchUser = createAsyncThunk<User>("user/fetchUser", async () => {
  const response = await fetch("/user").then((res) => res.json());
  return response;
});

export interface User {
  name: string;
}

interface UserState extends User {
  status: "idle" | "loading" | "complete" | "failure";
}

const initialState: UserState = {
  name: "No user",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "complete";
      state.name = action.payload.name;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "failure";
      state.name = initialState.name;
    });
  },
});

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserFetchStatus = (state: RootState) => state.user.status;
export default userSlice.reducer;

export const _sourceCode = `import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export const fetchUser = createAsyncThunk<User>("user/fetchUser", async () => {
  const response = await fetch("/user").then((res) => res.json());
  return response;
});

export interface User {
  name: string;
}

interface UserState extends User {
  status: "idle" | "loading" | "complete" | "failure";
}

const initialState: UserState = {
  name: "No user",
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "complete";
      state.name = action.payload.name;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = "failure";
      state.name = initialState.name;
    });
  },
});

export const selectUserName = (state: RootState) => state.user.name;
export const selectUserFetchStatus = (state: RootState) => state.user.status;
export default userSlice.reducer;
`;
