import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface FormState {
  title: string;
  description: string;
}

const initialState: FormState = {
  title: "제목 없는 설문지",
  description: "",
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
  },
});

export const { setTitle, setDescription } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
