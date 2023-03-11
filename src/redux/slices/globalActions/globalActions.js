const { createAsyncThunk } = require("@reduxjs/toolkit");

//reset error action

export const resetErrAction = createAsyncThunk("resetErr-Action", () => {
  return {};
});

//reset success action

export const resetSuccessAction = createAsyncThunk(
  "resetSuccess-Action",
  () => {
    return {};
  }
);
