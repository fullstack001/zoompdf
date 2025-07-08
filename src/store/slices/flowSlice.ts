import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  fileName: string;
  plan: string | null;
  action: string | null;
}

const initialState: FileState = {
  fileName: "",
  plan: null,
  action: null,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setFileName(state, action: PayloadAction<string>) {
      state.fileName = action.payload;
    },
    setPlan(state, action: PayloadAction<string>) {
      state.plan = action.payload; // Update the plan in the global store
    },
    setAction(state, action: PayloadAction<string>) {
      state.action = action.payload;
    },
  },
});

export const { setFileName, setPlan, setAction } = flowSlice.actions;
export default flowSlice.reducer;
