import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type formTypes = "shortText" | "longText" | "radio" | "check";

interface optionProps {
  label: string;
}

export interface formProps {
  question: string;
  type: formTypes;
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
      console.log("setTitle", action.payload);
      state.title = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      console.log("setDescription", action.payload);
      state.description = action.payload;
    },
    addForm: (state) => {
      console.log("addForm");
      state.forms.push(defaultForm);
    },
    deleteForm: (state, action: PayloadAction<number>) => {
      console.log("deleteForm", action.payload);
      state.forms.splice(action.payload, 1);
    },
    setFormQuestion: (state, action: PayloadAction<{ index: number; value: string }>) => {
      console.log("setFormQuestion", action.payload);
      const { index, value } = action.payload;
      state.forms[index].question = value;
    },
    setNecessary: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      console.log("setNecessary", action.payload);
      const { index, value } = action.payload;
      state.forms[index].necessary = value;
    },
  },
});

export const { setTitle, setDescription, addForm, deleteForm, setFormQuestion, setNecessary } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
