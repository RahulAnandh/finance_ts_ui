import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  FinanceState,
  TypeHardwareTeam,
  TypeCreateFinance,
  TypeFinanceList,
} from "./type";
import { BASE_URL } from "../constant";
const initialState: FinanceState = {
  finance_form_active: false,
  hardware_team_list: [],
  loading_hardware_team_list: false,

  loading_create_finance: false,
  finance_list: {
    deleted: [],
    not_deleted: [],
  },
  loading_finance_list: false,
  message: {
    message_type: "",
    message_string: "",
  },
  loading_update_finance: false,
  loading_delete_finance: false,
};

const auth_token = window.sessionStorage.getItem("token");
export const getUsershardwareTeam = createAsyncThunk(
  "finance/getUsershardwareTeam",
  async () => {
    const response = await fetch(
      `${BASE_URL}/user/getUserId?userType=HARDWARE`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          mode: "cors",
          referrerPolicy: "origin",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
    const data = response.json();
    return data;
  }
);
export const createFinance = createAsyncThunk(
  "finance/createFinance",
  async (payload: TypeCreateFinance) => {
    const response = await fetch(`${BASE_URL}/finance/create_finance`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        mode: "cors",
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${auth_token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = response.json();
    return data;
  }
);
export const updateFinance = createAsyncThunk(
  "finance/updateFinance",
  async (payload: TypeCreateFinance) => {
    const response = await fetch(
      `${BASE_URL}/finance/update_finance/${payload.finance_id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          mode: "cors",
          referrerPolicy: "origin",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth_token}`,
        },
        body: JSON.stringify(payload),
      }
    );
    const data = response.json();
    return data;
  }
);
export const deleteFinance = createAsyncThunk(
  "finance/deleteFinance",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/finance/delete_finance/${payload}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          mode: "cors",
          referrerPolicy: "origin",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth_token}`,
        },
        // body: JSON.stringify(payload),
      }
    );
    const data = response.json();
    return data;
  }
);
export const undoDeleteFinance = createAsyncThunk(
  "finance/undoDeleteFinance",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/finance/undo_delete_finance/${payload}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          mode: "cors",
          referrerPolicy: "origin",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${auth_token}`,
        },
        // body: JSON.stringify(payload),
      }
    );
    const data = response.json();
    return data;
  }
);

export const getFinanceList = createAsyncThunk(
  "finance/getFinanceList",
  async () => {
    const response = await fetch(`${BASE_URL}/finance/get_all`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        mode: "cors",
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${auth_token}`,
      },
    });
    const data = response.json();
    return data;
  }
);

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setFinanceFormActive: (state, action: PayloadAction<boolean>) => {
      state.finance_form_active = action.payload;
    },
  },
  extraReducers: (builder) => {
    //------------------------------------------getUsershardwareTeam--------------------------------------------------
    builder.addCase(getUsershardwareTeam.pending, (state) => {
      state.loading_hardware_team_list = true;
    });
    builder.addCase(getUsershardwareTeam.rejected, (state) => {
      state.loading_hardware_team_list = false;
    });
    builder.addCase(
      getUsershardwareTeam.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_hardware_team_list = false;
        state.hardware_team_list = action.payload;
      }
    );
    //------------------------------------------createFinance--------------------------------------------------

    builder.addCase(createFinance.pending, (state) => {
      state.loading_create_finance = true;
    });
    builder.addCase(createFinance.rejected, (state) => {
      state.loading_create_finance = false;
      state.message = {
        message_type: "error",
        message_string: "Finance not created.",
      };
    });
    builder.addCase(
      createFinance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_create_finance = false;
        state.finance_form_active = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //------------------------------------------getFinanceList--------------------------------------------------

    builder.addCase(getFinanceList.pending, (state) => {
      state.loading_finance_list = true;
    });
    builder.addCase(getFinanceList.rejected, (state) => {
      state.loading_finance_list = false;
      state.message = {
        message_type: "error",
        message_string: "List is not loaded.",
      };
    });
    builder.addCase(
      getFinanceList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_finance_list = false;
        state.message = {
          message_type: "success",
          message_string: "Data is loaded",
        };
        state.finance_list = action.payload;
      }
    );

    //------------------------------------------updateFinance---------------------------------
    builder.addCase(updateFinance.pending, (state) => {
      state.loading_update_finance = true;
    });
    builder.addCase(updateFinance.rejected, (state) => {
      state.loading_update_finance = false;
      state.message = {
        message_type: "error",
        message_string: "Finance is not updated.",
      };
    });
    builder.addCase(
      updateFinance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_update_finance = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //-----------------------------------------------deleteFinance-------------------------------
    builder.addCase(deleteFinance.pending, (state) => {
      state.loading_delete_finance = true;
    });
    builder.addCase(deleteFinance.rejected, (state) => {
      state.loading_delete_finance = false;
      state.message = {
        message_type: "error",
        message_string: "Finance is not Deleted.",
      };
    });
    builder.addCase(
      deleteFinance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_finance = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
    //-----------------------------------------------undoDeleteFinance-------------------------------

    builder.addCase(undoDeleteFinance.pending, (state) => {
      state.loading_delete_finance = true;
    });
    builder.addCase(undoDeleteFinance.rejected, (state) => {
      state.loading_delete_finance = false;
      state.message = {
        message_type: "error",
        message_string: "Finance is not Deleted.",
      };
    });
    builder.addCase(
      undoDeleteFinance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_finance = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
  },
});

export const { setFinanceFormActive } = financeSlice.actions;
export default financeSlice.reducer;
