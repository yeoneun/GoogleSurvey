import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export type FormTypes = "shortText" | "longText" | "radio" | "check";

interface OptionProps {
  label: string;
}

export interface FormProps {
  question: string;
  type: FormTypes;
  options?: OptionProps[];
  useEtc: boolean;
  necessary: boolean;
}

export interface FormState {
  title: string;
  description: string;
  forms: FormProps[];
}

const defaultOption = [{ label: "옵션 1" }];

const defaultForm: FormProps = {
  question: "",
  type: "radio",
  options: defaultOption,
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
    copyForm: (state, action: PayloadAction<number>) => {
      console.log("copyForm", action.payload);
      state.forms.splice(action.payload, 0, state.forms[action.payload]);
    },
    setFormQuestion: (state, action: PayloadAction<{ index: number; value: string }>) => {
      console.log("setFormQuestion", action.payload);
      const { index, value } = action.payload;
      state.forms[index].question = value;
    },
    setFormType: (state, action: PayloadAction<{ index: number; value: FormTypes }>) => {
      console.log("setFormType", action.payload);
      const { index, value } = action.payload;
      if (value === "shortText" || value === "longText") {
        state.forms[index].options = undefined;
      } else {
        if (!state.forms[index].options) {
          state.forms[index].options = defaultOption;
        }
      }
      state.forms[index].type = value;
    },
    setEtcUsage: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      console.log("setEtcUsage", action.payload);
      const { index, value } = action.payload;
      state.forms[index].useEtc = value;
    },
    addFormOption: (state, action: PayloadAction<{ index: number }>) => {
      console.log("addFormOption", action.payload);
      const { index } = action.payload;
      state.forms[index].options?.push({ label: `옵션 ${state.forms[index].options!.length + 1}` });
    },
    removeFormOption: (state, action: PayloadAction<{ index: number; optionIndex: number }>) => {
      console.log("removeFormOption", action.payload);
      const { index, optionIndex } = action.payload;
      state.forms[index].options!.splice(optionIndex, 1);
    },
    setFormOptionLabel: (state, action: PayloadAction<{ index: number; optionIndex: number; value: string }>) => {
      console.log("setFormOptionLabel", action.payload);
      const { index, optionIndex, value } = action.payload;
      state.forms[index].options![optionIndex].label = value;
    },
    setNecessary: (state, action: PayloadAction<{ index: number; value: boolean }>) => {
      console.log("setNecessary", action.payload);
      const { index, value } = action.payload;
      state.forms[index].necessary = value;
    },
    setFormIndex: (state, action: PayloadAction<{ from: number; to: number }>) => {
      console.log("setFormIndex", action.payload);
      const { from, to } = action.payload;
      state.forms.splice(to, 0, state.forms.splice(from, 1)[0]);
    },
  },
});

export const {
  setTitle,
  setDescription,
  addForm,
  deleteForm,
  copyForm,
  setFormQuestion,
  setFormType,
  setEtcUsage,
  addFormOption,
  removeFormOption,
  setFormOptionLabel,
  setNecessary,
  setFormIndex,
} = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
