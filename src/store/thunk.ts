import { createAsyncThunk } from "@reduxjs/toolkit";
import type { State, Dispatch, Dependencies } from ".";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: State;
  dispatch: Dispatch;
  extra: {
    dependencies: Dependencies;
  };
}>();
