import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  fileName: string;
  plan: string | null;
  action: string | null;
  editedPdfData: string | null; // Store as base64 string instead of Blob
  editedPdfFileName: string;
  editedPdfConverter:string | null;
}

const initialState: FileState = {
  fileName: "",
  plan: null,
  action: null,
  editedPdfData: null,
  editedPdfFileName: "",
  editedPdfConverter:null,
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
    setEditedPdf(state, action: PayloadAction<{
      [x: string]: string | null; data: string; fileName: string 
}>) {
      state.editedPdfData = action.payload.data;
      state.editedPdfFileName = action.payload.fileName;
      state.editedPdfConverter = action.payload.converter;
    },
    clearEditedPdf(state) {
      state.editedPdfData = null;
      state.editedPdfFileName = "";
      state.editedPdfConverter = null;
    },
  },
});

export const { setFileName, setPlan, setAction, setEditedPdf, clearEditedPdf } = flowSlice.actions;
export default flowSlice.reducer;
