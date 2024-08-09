import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  BankState,
  TypeHardwareTeam,
  TypeCreateBank,
  TypeUpdateBank,
  TypeBankList,
} from "./type";
import { BASE_URL } from "../constant";
const initialState: BankState = {
  bank_form_active: false,
  hardware_team_list: [],
  loading_hardware_team_list: false,

  loading_create_bank: false,
  bank_list: {
    deleted: [],
    not_deleted: [],
  },
  loading_bank_list: false,
  message: {
    message_type: "",
    message_string: "",
  },
  loading_update_bank: false,
  loading_delete_bank: false,
};

const auth_token = window.sessionStorage.getItem("token");
export const getUsershardwareTeam = createAsyncThunk(
  "bank/getUsershardwareTeam",
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
export const createBank = createAsyncThunk(
  "bank/createBank",
  async (payload: TypeCreateBank) => {
    console.log("1---1", payload);
    const response = await fetch(`${BASE_URL}/bank/create_bank`, {
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
export const updateBank = createAsyncThunk(
  "bank/updateBank",
  async (payload: TypeUpdateBank) => {
    const response = await fetch(`${BASE_URL}/bank/update_bank/${payload.id}`, {
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
    });
    const data = response.json();
    return data;
  }
);
export const deleteBank = createAsyncThunk(
  "bank/deleteBank",
  async (payload: string) => {
    const response = await fetch(`${BASE_URL}/bank/delete_bank/${payload}`, {
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
    });
    const data = response.json();
    return data;
  }
);
export const undoDeleteBank = createAsyncThunk(
  "bank/undoDeleteBank",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/bank/undo_delete_bank/${payload}`,
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

export const getBankList = createAsyncThunk("bank/getBankList", async () => {
  const response = await fetch(`${BASE_URL}/bank/get_all`, {
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
});

export const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    setBankFormActive: (state, action: PayloadAction<boolean>) => {
      state.bank_form_active = action.payload;
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
    //------------------------------------------createBank--------------------------------------------------

    builder.addCase(createBank.pending, (state) => {
      state.loading_create_bank = true;
    });
    builder.addCase(createBank.rejected, (state) => {
      state.loading_create_bank = false;
      state.message = {
        message_type: "error",
        message_string: "Bank not created.",
      };
    });
    builder.addCase(
      createBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_create_bank = false;
        state.bank_form_active = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //------------------------------------------getBankList--------------------------------------------------

    builder.addCase(getBankList.pending, (state) => {
      state.loading_bank_list = true;
    });
    builder.addCase(getBankList.rejected, (state) => {
      state.loading_bank_list = false;
      state.message = {
        message_type: "error",
        message_string: "List is not loaded.",
      };
    });
    builder.addCase(
      getBankList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_bank_list = false;
        state.message = {
          message_type: "success",
          message_string: "Data is loaded",
        };
        state.bank_list = action.payload;
      }
    );

    //------------------------------------------updateBank---------------------------------
    builder.addCase(updateBank.pending, (state) => {
      state.loading_update_bank = true;
    });
    builder.addCase(updateBank.rejected, (state) => {
      state.loading_update_bank = false;
      state.message = {
        message_type: "error",
        message_string: "Bank is not updated.",
      };
    });
    builder.addCase(
      updateBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_update_bank = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //-----------------------------------------------deleteBank-------------------------------
    builder.addCase(deleteBank.pending, (state) => {
      state.loading_delete_bank = true;
    });
    builder.addCase(deleteBank.rejected, (state) => {
      state.loading_delete_bank = false;
      state.message = {
        message_type: "error",
        message_string: "Bank is not Deleted.",
      };
    });
    builder.addCase(
      deleteBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_bank = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
    //-----------------------------------------------undoDeleteBank-------------------------------

    builder.addCase(undoDeleteBank.pending, (state) => {
      state.loading_delete_bank = true;
    });
    builder.addCase(undoDeleteBank.rejected, (state) => {
      state.loading_delete_bank = false;
      state.message = {
        message_type: "error",
        message_string: "Bank is not Deleted.",
      };
    });
    builder.addCase(
      undoDeleteBank.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_bank = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
  },
});

export const { setBankFormActive } = bankSlice.actions;
export default bankSlice.reducer;
