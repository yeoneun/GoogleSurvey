import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./slices/formSlice";
import focusSlice from "./slices/focusSlice";
import previewSlice from "./slices/previewSlice";

const store = configureStore({
  reducer: {
    form: formSlice,
    focus: focusSlice,
    preview: previewSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
