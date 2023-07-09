import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice";
import focusSlice from "./slices/focusSlice";

const store = configureStore({
  reducer: {
    form: formSlice,
    focus: focusSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
