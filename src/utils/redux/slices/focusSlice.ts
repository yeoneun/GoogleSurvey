import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface FocusState {
  headFocused: boolean;
  focusedFormIndex?: number;
}

const initialState: FocusState = {
  headFocused: false,
  focusedFormIndex: undefined,
};

export const focusSlice = createSlice({
  name: "focus",
  initialState,
  reducers: {
    setHeadFocused: (state, action: PayloadAction<boolean>) => {
      console.log("setHeadFocused", action.payload);
      removeFocusedFormIndex();
      state.headFocused = action.payload;
    },
    setFocusedFormIndex: (state, action: PayloadAction<number | undefined>) => {
      console.log("setFocusedFormIndex", action.payload);
      setHeadFocused(false);
      state.focusedFormIndex = action.payload;
    },
    removeFocusedFormIndex: (state) => {
      console.log("removeFocusedFormIndex");
      state.focusedFormIndex = undefined;
    },
  },
});

export const { setHeadFocused, setFocusedFormIndex, removeFocusedFormIndex } = focusSlice.actions;

export const selectFocus = (state: RootState) => state.focus;

export default focusSlice.reducer;
