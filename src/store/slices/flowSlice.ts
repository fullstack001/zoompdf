import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FileState {
  fileName: string;
  plan: string | null;
  action: string | null;
  editedPdfData: string | null; // Store as base64 string instead of Blob
  editedPdfFileName: string;
  editedPdfConverter: string | null;
  pendingFile: File | null; // Store pending file for conversion/compression
  pendingFiles: File[] | null; // Store multiple pending files for merge_pdf
  compressionLevel: number | null; // Store compression level if applicable (for compress_pdf action: 100 | 200 | 300)
  splitPageRanges: string | null; // Store page ranges for split_pdf action
}

const initialState: FileState = {
  fileName: "",
  plan: null,
  action: null,
  editedPdfData: null,
  editedPdfFileName: "",
  editedPdfConverter: null,
  pendingFile: null,
  pendingFiles: null,
  compressionLevel: null,
  splitPageRanges: null,
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
    setEditedPdf(
      state,
      action: PayloadAction<{
        [x: string]: string | null;
        data: string;
        fileName: string;
      }>
    ) {
      state.editedPdfData = action.payload.data;
      state.editedPdfFileName = action.payload.fileName;
      state.editedPdfConverter = action.payload.converter;
    },
    clearEditedPdf(state) {
      state.editedPdfData = null;
      state.editedPdfFileName = "";
      state.editedPdfConverter = null;
    },
    setPendingFile(
      state,
      action: PayloadAction<{
        file?: File;
        files?: File[];
        action: string;
        compressionLevel?: number;
        splitPageRanges?: string;
      }>
    ) {
      state.action = action.payload.action;
      if (action.payload.file) {
        state.pendingFile = action.payload.file;
        state.pendingFiles = null;
      }
      if (action.payload.files) {
        state.pendingFiles = action.payload.files;
        state.pendingFile = null;
      }
      if (action.payload.compressionLevel) {
        state.compressionLevel = action.payload.compressionLevel;
      }
      if (action.payload.splitPageRanges) {
        state.splitPageRanges = action.payload.splitPageRanges;
      }
    },
    clearPendingFile(state) {
      state.pendingFile = null;
      state.pendingFiles = null;
      state.compressionLevel = null;
      state.splitPageRanges = null;
    },
    clearFlow(state) {
      state.fileName = "";
      state.plan = null;
      state.action = null;
      state.editedPdfData = null;
      state.editedPdfFileName = "";
      state.editedPdfConverter = null;
      state.pendingFile = null;
      state.pendingFiles = null;
      state.compressionLevel = null;
      state.splitPageRanges = null;
    },
  },
});

export const {
  setFileName,
  setPlan,
  setAction,
  setEditedPdf,
  clearEditedPdf,
  setPendingFile,
  clearPendingFile,
  clearFlow,
} = flowSlice.actions;
export default flowSlice.reducer;
