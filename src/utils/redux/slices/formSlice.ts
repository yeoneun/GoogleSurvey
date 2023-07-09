import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface optionProps {
  label?: string;
}

export interface formProps {
  question: string;
  type: "shortText" | "longText" | "radio" | "check";
  options?: optionProps[];
  useEtc?: boolean;
  necessary: boolean;
}

export interface FormState {
  title: string;
  description: string;
  forms: formProps[];
}

const defaultForm: formProps = {
  question: "",
  type: "radio",
  options: [{ label: "옵션 1" }],
  useEtc: false,
  necessary: false,
};

const initialState: FormState = {
  title: "제목 없는 설문지",
  description: "",
  forms: [defaultForm],
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
    addForm: (state) => {
      state.forms.push(defaultForm);
    },
    deleteForm: (state, action: PayloadAction<number>) => {
      state.forms.splice(action.payload, 1);
    },
  },
});

export const { setTitle, setDescription, addForm, deleteForm } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
