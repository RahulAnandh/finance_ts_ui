import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

import tagSlice from "../features/tag/tagSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    tag: tagSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
