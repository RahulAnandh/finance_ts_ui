export interface TypeLoginData {
  user_name: string;
  password: string;
  remember: boolean;
}
export interface MessageType {
  message_type: "success" | "error" | "warning" | "info" | string;
  message_string: string;
}
export interface UserState {
  user_name: string;
  password: string;
  token: string;
  is_logged_in: boolean | string | null;
  loading: boolean;
  error: string;
  login_type: string;
  otp_status: boolean;
  message: MessageType;
}
