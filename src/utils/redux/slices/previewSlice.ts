import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type PreviewState = {
  values: string[][];
};

const initialState: PreviewState = {
  values: [],
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("reset");
      state.values = [];
    },
    setPreviewValues: (state, action: PayloadAction<{ formIndex: number; values: string[] }>) => {
      console.log("setPreviewValues", action.payload);
      const { formIndex, values } = action.payload;
      state.values[formIndex] = values;
    },
  },
});

export const { reset, setPreviewValues } = previewSlice.actions;

export const selectPreview = (state: RootState) => state.preview;

export default previewSlice.reducer;
