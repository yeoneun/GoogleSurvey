import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

type PreviewState = {
  formValues: {
    values: string[];
    etc: string;
  }[];
};

const initialState: PreviewState = {
  formValues: [],
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    reset: (state) => {
      console.log("reset");
      state.formValues = [];
    },
    setPreviewValues: (
      state,
      action: PayloadAction<{ formIndex: number; values: string[] }>
    ) => {
      console.log("setPreviewValues", action.payload);
      const { formIndex, values } = action.payload;
      state.formValues[formIndex].values = values;
    },
    setPriviewEtcValue: (
      state,
      action: PayloadAction<{ formIndex: number; value: string }>
    ) => {
      console.log("setPriviewEtcValue", action.payload);
      const { formIndex, value } = action.payload;
      state.formValues[formIndex].etc = value;
    },
  },
});

export const { reset, setPreviewValues, setPriviewEtcValue } =
  previewSlice.actions;

export const selectPreview = (state: RootState) => state.preview;

export default previewSlice.reducer;
