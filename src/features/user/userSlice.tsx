import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TypeLoginData, UserState } from "./type";
import { BASE_URL } from "../constant";
const initialState: UserState = {
  user_name: "",
  password: "",
  token: "",
  is_logged_in: Boolean(window.sessionStorage.getItem("is_logged_in")),
  loading: false,
  error: "",
  login_type: "mobile",
  otp_status: false,
  message: {
    message_type: "",
    message_string: "",
  },
};

export const loginPost = createAsyncThunk(
  "user/loginPost",
  async (payload: TypeLoginData) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    });
    const data = response.json();

    return data;
  }
);
export const logoutGet = createAsyncThunk("user/logoutGet", async () => {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();
  return data;
});
export const checkNumberExist = createAsyncThunk(
  "user/checkNumberExist",
  async (payload: any) => {
    const response = await fetch(`${BASE_URL}/login/is_number_exist`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        mode: "cors",
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload.mobile),
    });
    const data = response.json();
    return data;
  }
);
export const otpVerification = createAsyncThunk(
  "user/otpVerification",
  async (payload: any) => {
    const response = await fetch(`${BASE_URL}/login/otp_verification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        mode: "cors",
        referrerPolicy: "origin",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    });
    const data = response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoginType: (state, action: PayloadAction<string>) => {
      state.login_type = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.is_logged_in = action.payload;
      state.otp_status = action.payload;
    },
  },
  extraReducers: (builder) => {
    //------------------------------------------loginPost--------------------------------------------------
    builder.addCase(loginPost.pending, (state) => {
      state.loading = true;
      window.localStorage.setItem("is_logged_in", "false");
    });
    builder.addCase(loginPost.rejected, (state) => {
      state.loading = false;
      state.is_logged_in = true;
      window.localStorage.setItem("is_logged_in", "true");
    });
    builder.addCase(
      loginPost.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.is_logged_in = true;
        state.token = action.payload.auth;
        window.localStorage.setItem("is_logged_in", "true");
        window.localStorage.setItem("token", action.payload.token);
      }
    );
    //------------------------------------------logoutGet--------------------------------------------------

    builder.addCase(logoutGet.pending, (state) => {
      state.loading = true;
      window.localStorage.setItem("is_logged_in", "false");
    });
    builder.addCase(logoutGet.rejected, (state) => {
      state.loading = false;
      state.is_logged_in = true;
      window.localStorage.setItem("is_logged_in", "false");
    });
    builder.addCase(
      logoutGet.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.is_logged_in = false;
        state.token = action.payload.token;
        window.localStorage.clear();
      }
    );
    //------------------------------------------otpVerification--------------------------------------------------

    builder.addCase(
      otpVerification.fulfilled,
      (state, action: PayloadAction<any>) => {
        if (action.payload.bearerToken === undefined) {
          state.message = {
            message_type: "error",
            message_string: action.payload.message,
          };
          state.is_logged_in = false;
        }
        if (action.payload.token.length > 0 && action.payload.is_logged_in) {
          sessionStorage.setItem("user_role", action.payload.type);
          sessionStorage.setItem("token", action.payload.token);
          // sessionStorage.setItem("user_id", action.payload.id);
          sessionStorage.setItem("is_logged_in", action.payload.is_logged_in);
          state.is_logged_in = true;
          state.message = {
            message_type: "success",
            message_string: "Login Successful",
          };
        }
      }
    );

    //-----------------------------------------
    builder.addCase(
      checkNumberExist.rejected,
      (state, action: PayloadAction<any>) => {
        state.otp_status = false;
        state.message = {
          message_type: "error",
          message_string: action.payload.message,
        };
      }
    );
    builder.addCase(
      checkNumberExist.fulfilled,
      (state, action: PayloadAction<any>) => {
        console.log("1---1", action.payload);
        state.otp_status = action.payload.is_number_exist;
        state.message = {
          message_type: "success",
          message_string: "OTP sent to your mobile number.",
        };
      }
    );
  },
});
export const { setLoginType, setIsLoggedIn } = userSlice.actions;
export default userSlice.reducer;
