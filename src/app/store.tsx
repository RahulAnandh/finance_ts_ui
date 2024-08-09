import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

import tagSlice from "../features/tag/tagSlice";
import financeSlice from "../features/finance/financeSlice";
import bankSlice from "../features/bank/bankSlice";
import employeeSlice from "../features/employee/employeeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,

    tag: tagSlice,
    finance: financeSlice,
    bank: bankSlice,
    employee: employeeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
