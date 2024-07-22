import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TagState, TypeHardwareTeam, TypeCreateTag, TypeTagList } from "./type";
import { BASE_URL } from "../constant";
const initialState: TagState = {
  tag_form_active: false,
  hardware_team_list: [],
  loading_hardware_team_list: false,
  loading_create_tag: false,
  tag_list: {
    deployedTagDetails: [],
    unDeployedTagDetails: [],
  },
  loading_tag_list: false,
  message: {
    message_type: "",
    message_string: "",
  },
  loading_update_tag: false,
  loading_delete_tag: false,
};

const auth_token = window.sessionStorage.getItem("token");
export const getUsershardwareTeam = createAsyncThunk(
  "tag/getUsershardwareTeam",
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
export const createTag = createAsyncThunk(
  "tag/createTag",
  async (payload: TypeCreateTag) => {
    const response = await fetch(`${BASE_URL}/tagDetails/addTagDetails`, {
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
export const updateTag = createAsyncThunk(
  "tag/updateTag",
  async (payload: TypeCreateTag) => {
    const response = await fetch(
      `${BASE_URL}/tagDetails/updateTagDetailsById`,
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
export const deleteTag = createAsyncThunk(
  "tag/deleteTag",
  async (payload: string) => {
    const response = await fetch(
      `${BASE_URL}/tagDetails/deleteTagDetails?id=${payload}`,
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
        body: JSON.stringify(payload),
      }
    );
    const data = response.json();
    return data;
  }
);

export const getTagList = createAsyncThunk("tag/getTagList", async () => {
  const response = await fetch(`${BASE_URL}/tagDetails/getAllTagDetails`, {
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

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    setTagFormActive: (state, action: PayloadAction<boolean>) => {
      state.tag_form_active = action.payload;
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
    //------------------------------------------createTag--------------------------------------------------

    builder.addCase(createTag.pending, (state) => {
      state.loading_create_tag = true;
    });
    builder.addCase(createTag.rejected, (state) => {
      state.loading_create_tag = false;
      state.message = {
        message_type: "error",
        message_string: "Tag not created.",
      };
    });
    builder.addCase(
      createTag.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_create_tag = false;
        state.tag_form_active = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //------------------------------------------getTagList--------------------------------------------------

    builder.addCase(getTagList.pending, (state) => {
      state.loading_tag_list = true;
    });
    builder.addCase(getTagList.rejected, (state) => {
      state.loading_tag_list = false;
      state.message = {
        message_type: "error",
        message_string: "List is not loaded.",
      };
    });
    builder.addCase(
      getTagList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_tag_list = false;
        // state.message = {
        //   message_type: "success",
        //   message_string: "Data is loaded",
        // };
        state.tag_list = action.payload;
      }
    );

    //------------------------------------------updateTag---------------------------------
    builder.addCase(updateTag.pending, (state) => {
      state.loading_update_tag = true;
    });
    builder.addCase(updateTag.rejected, (state) => {
      state.loading_update_tag = false;
      state.message = {
        message_type: "error",
        message_string: "Tag is not updated.",
      };
    });
    builder.addCase(
      updateTag.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_update_tag = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );

    //-----------------------------------------------deleteTag-------------------------------
    builder.addCase(deleteTag.pending, (state) => {
      state.loading_delete_tag = true;
    });
    builder.addCase(deleteTag.rejected, (state) => {
      state.loading_delete_tag = false;
      state.message = {
        message_type: "error",
        message_string: "Tag is not Deleted.",
      };
    });
    builder.addCase(
      deleteTag.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.loading_delete_tag = false;
        state.message = {
          message_type: "success",
          message_string: action.payload.message,
        };
      }
    );
  },
});
export const { setTagFormActive } = tagSlice.actions;
export default tagSlice.reducer;
