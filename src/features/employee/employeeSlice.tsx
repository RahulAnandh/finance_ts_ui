import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { EmployeeState, TypeCreateEmployee, TypeUpdateEmployee } from "./type";
import { BASE_URL } from "../constant";
const initialState: EmployeeState = {
  employee_form_active: false,
  hardware_team_list: [],
  loading_hardware_team_list: false,

  loading_create_employee: false,
  employee_list: {
    deleted: [],
    not_deleted: [],
  },
  loading_employee_list: false,
  message: {
    message_type: "",
    message_string: "",
  },
  loading_update_employee: false,
  loading_delete_employee: false,
};

const auth_token = window.sessionStorage.getItem("token");
export const getUsershardwareTeam = createAsyncThunk(
  "employee/getUsershardwareTeam",
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
export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (payload: TypeCreateEmployee) => {
    const response = await fetch(`${BASE_URL}/employee/create_employee`, {
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
export const updateEmployee = createAsyncThunk(
  "employee/updateEmployee",
  async (payload: TypeUpdateEmployee) => {
    const response = await fetch(
      `${BASE_URL}/employee/update_employee/${payload.id}`,
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
export const deleteEmployee = createAsyncThunk(
  "employee/deleteEmployee",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/employee/delete_employee/${payload}`,
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
export const undoDeleteEmployee = createAsyncThunk(
  "employee/undoDeleteEmployee",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/employee/undo_delete_employee/${payload}`,
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
      }
    );
    const data = response.json();
    return data;
  }
);

export const getEmployeeList = createAsyncThunk(
  "employee/getEmployeeList",
  async () => {
    const response = await fetch(`${BASE_URL}/employee/get_all`, {
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

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    setEmployeeFormActive: (state, action: PayloadAction<boolean>) => {
      state.employee_form_active = action.payload;
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
    //------------------------------------------createEmployee--------------------------------------------------

    builder.addCase(createEmployee.pending, (state) => {
      state.loading_create_employee = true;
    });
    builder.addCase(createEmployee.rejected, (state) => {
      state.loading_create_employee = false;
      state.message = {
        message_type: "error",
        message_string: "Employee not created.",
      };
    });
    builder.addCase(
      createEmployee.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_create_employee = false;
        state.employee_form_active = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //------------------------------------------getEmployeeList--------------------------------------------------

    builder.addCase(getEmployeeList.pending, (state) => {
      state.loading_employee_list = true;
    });
    builder.addCase(getEmployeeList.rejected, (state) => {
      state.loading_employee_list = false;
      state.message = {
        message_type: "error",
        message_string: "List is not loaded.",
      };
    });
    builder.addCase(
      getEmployeeList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_employee_list = false;
        state.message = {
          message_type: "success",
          message_string: "Data is loaded",
        };
        state.employee_list = action.payload;
      }
    );

    //------------------------------------------updateEmployee---------------------------------
    builder.addCase(updateEmployee.pending, (state) => {
      state.loading_update_employee = true;
    });
    builder.addCase(updateEmployee.rejected, (state) => {
      state.loading_update_employee = false;
      state.message = {
        message_type: "error",
        message_string: "Employee is not updated.",
      };
    });
    builder.addCase(
      updateEmployee.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_update_employee = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //-----------------------------------------------deleteEmployee-------------------------------
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading_delete_employee = true;
    });
    builder.addCase(deleteEmployee.rejected, (state) => {
      state.loading_delete_employee = false;
      state.message = {
        message_type: "error",
        message_string: "Employee is not Deleted.",
      };
    });
    builder.addCase(
      deleteEmployee.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_employee = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
    //-----------------------------------------------undoDeleteEmplyee-------------------------------

    builder.addCase(undoDeleteEmployee.pending, (state) => {
      state.loading_delete_employee = true;
    });
    builder.addCase(undoDeleteEmployee.rejected, (state) => {
      state.loading_delete_employee = false;
      state.message = {
        message_type: "error",
        message_string: "Employee is not Deleted.",
      };
    });
    builder.addCase(
      undoDeleteEmployee.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_employee = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
  },
});

export const { setEmployeeFormActive } = employeeSlice.actions;
export default employeeSlice.reducer;
